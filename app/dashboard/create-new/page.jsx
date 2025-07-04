"use client";
import React, { useContext, useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import Type from "./_components/Type";
import Style from "./_components/Style";
import Mood from "./_components/Mood";
import Furniture from "./_components/Furniture";
import Lifestyle from "./_components/Lifestyle";
import Lighting from "./_components/Lighting";
import Storage from "./_components/Storage";
import Smart from "./_components/Smart";
import Sustainability from "./_components/Sustainability";
import Rental from "./_components/Rental";
import Budget from "./_components/Budget";
import Additional from "./_components/Additional";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { eq } from "drizzle-orm";
import { supabase } from "@/config/supabaseConfig";

function CreateNew() {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const SaveRawImageToSupabase = async () => {
    try {
      if (!formData.image) throw new Error("No image selected");

      const fileName = `${Date.now()}_${formData.image.name.replace(/\s+/g, "_")}`;
      const filePath = `Uploads/${fileName}`;

      const { error } = await supabase.storage
        .from("room-interior-design")
        .upload(filePath, formData.image, {
          contentType: formData.image.type,
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("room-interior-design")
        .getPublicUrl(filePath);

      if (!publicUrl) throw new Error("Failed to get URL");

      setOrgImage(publicUrl);
      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Image upload failed");
    }
  };

  const GenerateAiImage = async () => {
    if (userDetail?.credits < 1) {
      alert("Not enough credits!");
      return;
    }

    setLoading(true);
    try {
      const rawImageUrl = await SaveRawImageToSupabase();
      const payload = {
        imageUrl: rawImageUrl,
        type: formData?.type || "",
        lifestyle: formData?.lifestyle || "",
        style: formData?.style || "",
        lighting: formData?.lighting || "",
        storages: formData?.storages || "",
        furniture: formData?.furniture || "",
        mood: formData?.mood || "",
        smart: formData?.smart || false,
        sustainability: formData?.sustainability || false,
        rental: formData?.rental || false,
        budget: formData?.budget || "",
        additional: formData?.additional || "",
        userEmail: user?.primaryEmailAddress?.emailAddress || "",
      };

      const result = await axios.post("/api/interior-redesign", payload);
      setAiOutputImage(result.data.result);
      setOpenOutputDialog(true);
      await updateUserCredits();
    } catch (err) {
      console.error("Axios error:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to generate image. Check your API token, image URL, or try again later.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateUserCredits = async () => {
    try {
      await db.update(Users)
        .set({ credits: userDetail?.credits - 1 })
        .where(eq(Users.clerkUserId, user?.id));
      setUserDetail((prev) => ({ ...prev, credits: prev.credits - 1 }));
    } catch (error) {
      console.error("Credit update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60"></div>
          </div>
          
          <div className="relative">
            <h2 className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Remodel Any Interior With the Magic of AI ✨
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Transform any interior with a click. Choose any option below based on
              type, style, mood, budget, etc, and watch as AI instantly reimagines
              your interior
            </p>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        <div>
          <Type selectedType={(value) => onHandleInputChange(value, "type")} />
          <Lifestyle
            selectedLifestyle={(value) => onHandleInputChange(value, "lifestyle")}
          />
          <Style
            selectedStyle={(value) => onHandleInputChange(value, "style")}
          />
          <div className="grid grid-cols-2 gap-10 w-full">
            <Lighting
              selectedLighting={(value) => onHandleInputChange(value, "lighting")}
            />
            <Storage
              selectedStorage={(value) => onHandleInputChange(value, "storages")}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 w-full">
            <Furniture
              selectedFurniture={(value) => onHandleInputChange(value, "furniture")}
            />
            <Mood
              selectedMood={(value) => onHandleInputChange(value, "mood")}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 w-full">
            <Smart
              selectedSmart={(value) => onHandleInputChange(value, "smart")}
            />
            <Sustainability
              selectedSustainability={(value) =>
                onHandleInputChange(value, "sustainability")
              }
            />
            <Rental
              selectedRental={(value) => onHandleInputChange(value, "rental")}
            />
          </div>
          <Budget
            selectedBudget={(value) => onHandleInputChange(value, "budget")}
          />
          <Additional
            additionalInput={(value) =>
              onHandleInputChange(value, "additional")
            }
          />
          <Button
            className="w-full mt-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              GenerateAiImage();
              document.activeElement.blur(); // Prevent button focus when dialog opens
            }}
            disabled={
              userDetail?.credits < 1 ||
              !formData.image ||
              !formData.type ||
              !formData.style ||
              !formData.lifestyle
            }
          >
            Generate
          </Button>
          {userDetail?.credits < 1 ? (
            <p className="text-red-500 text-sm mt-2 mb-10">
              You don't have enough credits. Please purchase more.
            </p>
          ) : (
            <p className="text-sm text-gray-400 mt-2 mb-10">
              NOTE: 1 Credit will be used to remodel your interior
            </p>
          )}
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
    </div>
  );
}

export default CreateNew;