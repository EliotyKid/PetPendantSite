"use client";

import ButtonCheckout from "@/components/ButtonCheckout";
import ExperienceCustomize from "@/components/ExperienceCustomize";
import { Canvas } from "@react-three/fiber";
import { Check, Upload, X } from "lucide-react";
import React, { Suspense, useRef, useState } from "react";

export type Material = "gold" | "silver" | "rose";
export type Shape = "coin" | "heart" | "rectangle";
type Chain = "rope" | "box" | "figaro";
const MATERIALS: Record<Material, { name: string; color: string }> = {
  gold: {
    name: "18k Gold",
    color: "#E6C200",
  },
  silver: {
    name: "Silver",
    color: "#E0E0E0",
  },
  rose: {
    name: "Rose Gold",
    color: "#B76E79",
  },
};

const SHAPES: Record<Shape, { name: string }> = {
  coin: { name: "Circle" },
  heart: { name: "Heart" },
  rectangle: { name: "Tag" },
};

const CHAINS: Record<Chain, { name: string }> = {
  rope: { name: "Rope Chain" },
  box: { name: "Box Chain" },
  figaro: { name: "Figaro Chain" },
};

const Customize = () => {
  const [material, setMaterial] = useState<Material>("gold");
  const [shape, setShape] = useState<Shape>("coin");
  const [chain, setChain] = useState<Chain>("rope");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row w-screen">
      {/* Lado esquerdo */}
      <section className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 bg-base flex items-center justify-center overflow-hidden border-b md:border-b-0 border-secondary z-10">
        <div className="absolute inset-0 opacity-5 pointer-events-none" />
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0, 6], fov: 35 }}
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
            shadows
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ExperienceCustomize
                active={shape}
                material={material}
                image={uploadedImage}
                text={customText}
              />
            </Suspense>
          </Canvas>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50">
          <span className="text-sm uppercase tracking-widest text-base font-montserrat">
            Interactive 3D Preview
          </span>
        </div>
      </section>

      {/* Right Side */}
      <section className="w-full md:w-1/2 min-h-screen py-20 px-6 md:px-20 bg-base">
        <div className="max-w-md mx-auto flex flex-col gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              Design your piece.
            </h1>
            <p className="text-neutral-400">
              Craft a unique pendant that tells your story perfectly.
            </p>
          </div>

          {/* 1 SHAPE */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
              1. Pendant Shape
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(SHAPES) as Shape[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setShape(key)}
                  className={`
                    p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300
                    ${shape === key ? "border-white bg-secondary" : "border-neutral-800 hover:border-neutral-700"}
                  `}
                >
                  <div
                    className={`w-8 h-8 border-2 border-neutral-400 flex items-center justify-center ${key === "coin" ? "rounded-full" : key === "rectangle" ? "rounded-sm aspect-3/4" : ""}`}
                  >
                    {key == "heart" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-5 h-5 text-neutral-400"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-medium font-montserrat">
                    {SHAPES[key].name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* MATERIAL */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
              2. Select Material
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(MATERIALS) as Material[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setMaterial(key)}
                  className={`
                    relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300
                    ${material === key ? "border-white bg-secondary" : "border-neutral-800 hover:border-neutral-700"}
                  `}
                >
                  <div
                    className="w-8 h-8 rounded-full shadow-lg border border-white/10"
                    style={{ background: MATERIALS[key].color }}
                  />
                  <span className="text-xs font-medium">
                    {MATERIALS[key].name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* UPLOAD IMAGE */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
              3. Upload Photo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 relative overflow-hidden
                ${uploadedImage ? "border-primary bg-secondary" : "border-neutral-800 hover:border-neutral-700 hover:bg-black"}
              `}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploadedImage ? (
              <div className="flex items-center gap-2 text-primary z-10">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Applied</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedImage(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/20 rounded-full hover:bg-red/50 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-neutral-400" />
                <span className="text-sm text-neutral-400">
                  Click to upload
                </span>
              </>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                4. Back Text
              </label>
              <span className="text-sm text-neutral-600">
                {customText.length}/10
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={20}
                placeholder="e.g. Love, Initials..."
                className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl md:text-2xl font-medium text-secondary placeholder:text-neutral-700 focus:outline-none focus:border-primary transition-colors"
              />
              {customText.length > 0 && (
                <button
                  onClick={() => setCustomText("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-neutral-500">
              Text will be engraved on the back of the pendant
            </p>
          </div>

          <ButtonCheckout
            shape={shape}
            material={material}
            engravingOption="withBackEngraving"
          />
        </div>
      </section>
    </main>
  );
};

export default Customize;
