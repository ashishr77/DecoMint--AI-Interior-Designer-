import { NextResponse } from "next/server";
import { supabase } from "@/config/supabaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";

export async function POST(req) {
  try {
    const requestBody = await req.json();
    const {
      imageUrl,
      type,
      lifestyle,
      style,
      lighting,
      storages,
      furniture,
      mood,
      smart,
      sustainability,
      rental,
      budget,
      additional,
      userEmail,
    } = requestBody;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    // Enhanced prompt for better results
    const prompt = `professional interior design, ${style} ${type} room, ${mood} atmosphere, ${lighting} lighting, modern furniture, clean organized space, architectural photography, high resolution, realistic, detailed`;

    console.log("Starting AI image generation...");
    console.log("Prompt:", prompt);

    let generatedImageUrl;
    let modelUsed;
    let serviceUsed;

    // Try multiple services in order of reliability
    const services = [
      { name: "Hugging Face", func: tryHuggingFace },
      { name: "Stability AI", func: tryStabilityAI },
      { name: "Leonardo AI", func: tryLeonardoAI },
      { name: "Replicate", func: tryReplicate },
      
    ];

    for (const service of services) {
      try {
        console.log(`Trying ${service.name}...`);
        const result = await service.func(prompt);
        if (result.success) {
          generatedImageUrl = result.imageUrl;
          modelUsed = result.model;
          serviceUsed = service.name;
          console.log(`✅ Success with ${service.name}`);
          break;
        }
      } catch (error) {
        console.log(`❌ ${service.name} failed:`, error.message);
        continue;
      }
    }

    // If all services failed, return error
    if (!generatedImageUrl) {
      return NextResponse.json({ 
        error: "All AI services are currently busy. Please try again in a few minutes.",
        suggestion: "Consider using local Stable Diffusion for unlimited generation."
      }, { status: 503 });
    }

    // Save to database - Clean data before insert
    try {
      // Helper function to clean integer fields
      const cleanIntegerField = (value) => {
        if (value === "" || value === null || value === undefined) {
          return null;
        }
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
      };

      // Helper function to clean string fields
      const cleanStringField = (value) => {
        if (value === "" || value === null || value === undefined) {
          return null;
        }
        return value.toString().trim();
      };

      // Helper function to clean boolean fields
      const cleanBooleanField = (value) => {
        if (value === "" || value === null || value === undefined) {
          return false;
        }
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
          return value.toLowerCase() === 'true' || value === '1' || value === 'yes';
        }
        return Boolean(value);
      };

      await db.insert(AiGeneratedImage).values({
        type: cleanStringField(type),
        style: cleanStringField(style),
        lighting: cleanStringField(lighting),
        storages: cleanStringField(storages),
        furniture: cleanStringField(furniture),
        mood: cleanStringField(mood),
        smart: cleanBooleanField(smart),
        sustainability: cleanBooleanField(sustainability),
        rental: cleanBooleanField(rental),
        budget: cleanIntegerField(budget),
        additional: cleanStringField(additional),
        orgImage: cleanStringField(imageUrl),
        aiImage: cleanStringField(generatedImageUrl),
        userEmail: cleanStringField(userEmail),
      });
      
      console.log(`Database insert successful, used ${serviceUsed}: ${modelUsed}`);
    } catch (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: `Database insert failed: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ 
      result: generatedImageUrl,
      model: modelUsed,
      service: serviceUsed,
      message: "Image generated successfully!"
    });
    
  } catch (e) {
    console.error("General error in API route:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}
// Hugging Face (Improved with better models)
async function tryHuggingFace(prompt) {
  if (!process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN) {
    throw new Error("Hugging Face API token not configured");
  }

  // Better model selection - most reliable first
  const models = [
    "stabilityai/stable-diffusion-xl-base-1.0",
    "runwayml/stable-diffusion-v1-5",
    "SG161222/Realistic_Vision_V5.1_noVAE",
    "dreamlike-art/dreamlike-photoreal-2.0",
    "CompVis/stable-diffusion-v1-4",
    "black-forest-labs/flux-1-schnell",
    "segmind/SSD-1B"
  ];

  for (const model of models) {
    try {
      console.log(`Trying HF model: ${model}`);
      
      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, low quality, distorted, unrealistic, cluttered, messy",
            num_inference_steps: 25,
            guidance_scale: 7.5,
            width: 512,
            height: 512,
          },
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("image")) {
          const imageArrayBuffer = await response.arrayBuffer();
          const base64Image = Buffer.from(imageArrayBuffer).toString("base64");
          
          // Upload to Supabase
          const fileName = `hf_${Date.now()}.png`;
          const filePath = `room-interior-design/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from("room-interior-design")
            .upload(filePath, base64ImageToBlob(`data:image/png;base64,${base64Image}`), {
              contentType: "image/png",
              upsert: false,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from("room-interior-design")
              .getPublicUrl(filePath);
            
            return {
              success: true,
              imageUrl: urlData.publicUrl,
              model: model
            };
          }
        } else {
          // Handle JSON response
          const jsonResponse = await response.json();
          if (jsonResponse.error && jsonResponse.error.includes("loading")) {
            console.log(`Model ${model} is loading, skipping...`);
            continue;
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log(`Model ${model} timed out`);
      } else {
        console.log(`Model ${model} failed: ${error.message}`);
      }
      continue;
    }
  }
  
  throw new Error("All Hugging Face models failed");
}

// Leonardo AI (Most Reliable Free Option)
async function tryLeonardoAI(prompt) {
  if (!process.env.LEONARDO_API_KEY) {
    throw new Error("Leonardo API key not configured");
  }

  const response = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.LEONARDO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative model
      width: 512,
      height: 512,
      num_images: 1,
      guidance_scale: 7,
      num_inference_steps: 15,
      presetStyle: "CINEMATIC"
    }),
  });

  if (!response.ok) {
    throw new Error(`Leonardo AI failed: ${response.statusText}`);
  }

  const data = await response.json();
  const generationId = data.sdGenerationJob.generationId;

  // Wait for generation to complete
  let attempts = 0;
  while (attempts < 30) { // 30 attempts = 1 minute
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.LEONARDO_API_KEY}`,
      },
    });

    const statusData = await statusResponse.json();
    
    if (statusData.generations_by_pk.status === "COMPLETE") {
      const imageUrl = statusData.generations_by_pk.generated_images[0].url;
      
      // Upload to Supabase
      const uploadedUrl = await uploadImageToSupabase(imageUrl, "leonardo");
      
      return {
        success: true,
        imageUrl: uploadedUrl,
        model: "Leonardo Creative"
      };
    }
    
    attempts++;
  }
  
  throw new Error("Leonardo AI generation timed out");
}

// Replicate (Free Credits)
async function tryReplicate(prompt) {
  if (!process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN) {
    throw new Error("Replicate API token not configured");
  }

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b", // SDXL
      input: {
        prompt: prompt,
        negative_prompt: "blurry, low quality, distorted, unrealistic, cluttered, messy",
        width: 512,
        height: 512,
        num_inference_steps: 25,
        guidance_scale: 7.5,
        scheduler: "K_EULER"
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Replicate failed: ${response.statusText}`);
  }

  const prediction = await response.json();
  const predictionId = prediction.id;

  // Wait for completion
  let attempts = 0;
  while (attempts < 30) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
      },
    });

    const statusData = await statusResponse.json();
    
    if (statusData.status === "succeeded") {
      const imageUrl = statusData.output[0];
      
      // Upload to Supabase
      const uploadedUrl = await uploadImageToSupabase(imageUrl, "replicate");
      
      return {
        success: true,
        imageUrl: uploadedUrl,
        model: "Stable Diffusion XL"
      };
    } else if (statusData.status === "failed") {
      throw new Error("Replicate generation failed");
    }
    
    attempts++;
  }
  
  throw new Error("Replicate generation timed out");
}


// Stability AI (Free Tier)
async function tryStabilityAI(prompt) {
  if (!process.env.NEXT_PUBLIC_STABILITY_API_KEY) {
    throw new Error("Stability API key not configured");
  }

  const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompt,
          weight: 1
        },
        {
          text: "blurry, low quality, distorted, unrealistic, cluttered, messy",
          weight: -1
        }
      ],
      cfg_scale: 7,
      height: 512,
      width: 512,
      samples: 1,
      steps: 25,
    }),
  });

  if (!response.ok) {
    throw new Error(`Stability AI failed: ${response.statusText}`);
  }

  const data = await response.json();
  const base64Image = data.artifacts[0].base64;
  
  // Upload to Supabase
  const fileName = `stability_${Date.now()}.png`;
  const filePath = `room-interior-design/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from("room-interior-design")
    .upload(filePath, base64ImageToBlob(`data:image/png;base64,${base64Image}`), {
      contentType: "image/png",
      upsert: false,
    });

  if (uploadError) {
    throw new Error("Failed to upload to Supabase");
  }

  const { data: urlData } = supabase.storage
    .from("room-interior-design")
    .getPublicUrl(filePath);
  
  return {
    success: true,
    imageUrl: urlData.publicUrl,
    model: "Stable Diffusion XL"
  };
}

// Helper function to upload external image to Supabase
async function uploadImageToSupabase(imageUrl, service) {
  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();
  
  const fileName = `${service}_${Date.now()}.png`;
  const filePath = `room-interior-design/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from("room-interior-design")
    .upload(filePath, imageBuffer, {
      contentType: "image/png",
      upsert: false,
    });

  if (uploadError) {
    throw new Error("Failed to upload to Supabase");
  }

  const { data: urlData } = supabase.storage
    .from("room-interior-design")
    .getPublicUrl(filePath);
  
  return urlData.publicUrl;
}

// Helper function to convert base64 to blob
function base64ImageToBlob(base64Data) {
  const base64WithoutPrefix = base64Data.split(";base64,").pop();
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/png" });
}