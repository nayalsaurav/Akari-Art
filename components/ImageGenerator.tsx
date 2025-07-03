"use client";
import React, { useState } from "react";
import {
  Paintbrush,
  Share2,
  Loader2,
  ImageIcon,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Image from "next/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const ImageGenerator = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const name: string = session?.user.name!;
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; prompt?: string }>({});

  const validateForm = () => {
    const newErrors: { prompt?: string } = {};

    if (!prompt.trim()) {
      newErrors.prompt = "Prompt is required";
    } else if (prompt.trim().length < 10) {
      newErrors.prompt = "Prompt must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setShowSkeleton(true);
    setGeneratedImage(null);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/image-generation`, {
        prompt,
      });

      setGeneratedImage(data?.photo);
    } catch (error) {
      console.error("Generation failed:", error);
      toast("Image generation failed");
    } finally {
      setIsGenerating(false);
      setShowSkeleton(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    if (name && prompt && generatedImage) {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/post`, {
          name,
          prompt,
          photo: generatedImage,
        });
        console.log(data);
        toast("Shared with Community");
        router.push("/community");
      } catch (error) {
        console.error("Share failed:", error);
        toast("Share failed");
      } finally {
        setIsSharing(false);
      }
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6`}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
              <Paintbrush className="text-purple-400" size={32} />
              Create Your Art
            </h1>
            <p className="text-gray-400">
              Transform your imagination into stunning visuals with AI
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Artwork Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                disabled
                placeholder="Enter a name for your creation..."
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 
                  transition-all duration-200 focus:outline-none focus:ring-2 backdrop-blur-sm
                  ${"border-gray-700 focus:border-purple-500 focus:ring-purple-500/50 hover:border-gray-600"}`}
              />
            </div>
          </div>

          {/* Prompt Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-300"
            >
              Prompt
            </label>
            <div className="relative">
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (errors.prompt)
                    setErrors((prev) => ({ ...prev, prompt: undefined }));
                }}
                placeholder="Describe your vision in detail... Be creative and specific!"
                rows={4}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 
                  transition-all duration-200 focus:outline-none focus:ring-2 backdrop-blur-sm resize-none
                  ${
                    errors.prompt
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50 hover:border-gray-600"
                  }`}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {prompt.length}/500
              </div>
              {errors.prompt && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {errors.prompt}
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 
              disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
              text-white font-semibold rounded-lg transition-all duration-200 
              transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none
              shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating Your Art...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Image
              </>
            )}
          </Button>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Preview</h2>
            <p className="text-gray-400">
              Your generated artwork will appear here
            </p>
          </div>

          {/* Image Preview Container */}
          <div className="relative aspect-square bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-lg overflow-hidden backdrop-blur-sm">
            {showSkeleton && (
              <div className="absolute inset-0 animate-pulse">
                <div className="h-full w-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                    -skew-x-12 animate-shimmer"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2
                        className="animate-spin text-purple-400 mx-auto mb-4"
                        size={48}
                      />
                      <p className="text-gray-400 font-medium">
                        Creating your masterpiece...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {generatedImage && !showSkeleton && (
              <div className="relative h-full group">
                <Image
                  src={generatedImage}
                  alt={name || "Generated artwork"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={500}
                  height={500}
                />
              </div>
            )}

            {!generatedImage && !showSkeleton && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ImageIcon size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No image generated yet</p>
                <p className="text-sm opacity-75">
                  Fill in the form and click generate
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {generatedImage && !showSkeleton && (
            <div>
              <Button
                onClick={handleShare}
                className="py-3 px-4 bg-teal-600/80 hover:bg-teal-500/80 text-white font-medium rounded-lg 
                  transition-colors duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
                disabled={isSharing}
              >
                {isSharing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sharing Your Art...
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    Share with Community
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
