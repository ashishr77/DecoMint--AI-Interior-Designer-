// "use client";
// import React from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import ReactBeforeSliderComponent from "react-before-after-slider-component";
// import "react-before-after-slider-component/dist/build.css";
// import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";

// function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
//   return (
//     <AlertDialog open={openDialog} onOpenChange={closeDialog}>
//       <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
//       <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <AlertDialogHeader>
//           <AlertDialogTitle>AI Generated Result</AlertDialogTitle>
//           <AlertDialogDescription>
//             Slide to compare the original image with the AI-generated redesign
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         {/* Fixed slider with proper aspect ratio */}
//         <div className="relative w-full h-auto my-4">
//           {aiImage && orgImage ? (
//             <div className="w-full" style={{ minHeight: "300px" }}>
//               <ReactBeforeSliderComponent
//                 firstImage={{
//                   imageUrl: aiImage,
//                   alt: "AI Generated Interior Design",
//                 }}
//                 secondImage={{
//                   imageUrl: orgImage,
//                   alt: "Original Room Image",
//                 }}
//                 delimiterColor="#f97316"
//                 styles={{
//                   firstImage: { 
//                     width: "100%", 
//                     height: "auto",
//                     objectFit: "contain",
//                     maxHeight: "500px"
//                   },
//                   secondImage: { 
//                     width: "100%", 
//                     height: "auto",
//                     objectFit: "contain",
//                     maxHeight: "500px"
//                   },
//                 }}
//               />
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
//                 <p className="text-gray-500">Generating your interior design...</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
//           <AlertDialogCancel asChild>
//             <Button variant="outline" className="w-full sm:w-auto">
//               Close
//             </Button>
//           </AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Button
//               onClick={() => {
//                 if (aiImage) {
//                   // Create a temporary link to download the image
//                   const link = document.createElement('a');
//                   link.href = aiImage;
//                   link.download = `interior-design-${Date.now()}.png`;
//                   document.body.appendChild(link);
//                   link.click();
//                   document.body.removeChild(link);
//                 } else {
//                   window.open(aiImage, "_blank");
//                 }
//               }}
//               disabled={!aiImage}
//               className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
//             >
//               Download Result
//             </Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default AiOutputDialog;

"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { Download, X, Sparkles, Image as ImageIcon } from "lucide-react";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [sliderSize, setSliderSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const maxWidth = Math.min(window.innerWidth * 0.95, 800);
      const maxHeight = window.innerHeight * 0.6;
      const aspectRatio = 4 / 3;

      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setSliderSize({ width, height });
    };

    if (openDialog) {
      updateSize();
      window.addEventListener("resize", updateSize);
    }

    return () => window.removeEventListener("resize", updateSize);
  }, [openDialog]);

  useEffect(() => {
    setIsLoading(!aiImage);
  }, [aiImage]);

  const handleOpenFullscreenImage = () => {
    if (!aiImage) return;

    const newWindow = window.open(aiImage, "_blank");

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>AI Interior Design</title>
            <style>
              body {
                margin: 0;
                background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${aiImage}" alt="AI Interior Design" />
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={closeDialog}>
      <AlertDialogOverlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <AlertDialogContent className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-[95vw] w-auto overflow-hidden border-0 p-0">
        
        {/* Header */}
        <AlertDialogHeader className="relative p-6 pb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <AlertDialogTitle className="text-2xl font-bold text-white mb-1">
                  AI Interior Design
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/90 text-sm">
                  Compare before and after
                </AlertDialogDescription>
              </div>
            </div>
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        {/* Main Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
          <div
            className="bg-gray-100 dark:bg-gray-800 rounded-xl flex justify-center items-center mx-auto"
            style={{
              width: sliderSize.width,
              height: sliderSize.height,
              maxWidth: "100%",
            }}
          >
            {isLoading ? (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p>Generating your design...</p>
              </div>
            ) : aiImage && orgImage ? (
              <ReactBeforeSliderComponent
                firstImage={{ imageUrl: aiImage, alt: "AI Design" }}
                secondImage={{ imageUrl: orgImage, alt: "Original" }}
                delimiterColor="#f97316"
                styles={{
                  container: {
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    objectFit: "contain",
                  },
                  firstImage: { objectFit: "contain" },
                  secondImage: { objectFit: "contain" },
                }}
              />
            ) : (
              <div className="text-center p-8">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p>No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="p-4 sm:p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-lg border-gray-300 dark:border-gray-600"
              >
                Close
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                onClick={handleOpenFullscreenImage}
                disabled={!aiImage}
                className="flex-1 h-11 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg shadow"
              >
                <Download className="h-4 w-4 mr-2" />
                View Fullscreen
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
