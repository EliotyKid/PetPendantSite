"use client";

import {
  forwardRef,
  ComponentPropsWithoutRef,
  useMemo,
  useEffect,
} from "react";
import { useGLTF } from "@react-three/drei";
import { Group, MeshStandardMaterial } from "three";
import { ImageDecal } from "../ImageDecal";
import TextDecal from "../TextDecal";

// --- INTERFACE ---
// Adicionei textureUrl e engravingText para tornar dinâmico
interface CustomModelProps extends ComponentPropsWithoutRef<"group"> {
  materialType?: string;
  textureUrl?: string | null;
  engravingText?: string | null;
}

const Coin = forwardRef<Group, CustomModelProps>(
  ({ materialType, textureUrl, engravingText, ...props }, ref) => {
    const { nodes, materials } = useGLTF("/models/Circle.glb") as any;

    // --- LÓGICA DE MATERIAL (Mesma de antes) ---
    const baseMaterial = materials.Gold || Object.values(materials)[0];
    const customMaterial = useMemo(() => {
      if (!baseMaterial) return null;
      return baseMaterial.clone() as MeshStandardMaterial;
    }, [baseMaterial]);

    useEffect(() => {
      if (!customMaterial) return;
      customMaterial.metalness = 0.2;
      customMaterial.roughness = 0.25;

      if (materialType === "rose") {
        customMaterial.color.set("#B76E79");
      } else if (materialType === "silver") {
        customMaterial.color.set("#ECECEC");
        customMaterial.roughness = 0.15;
      } else {
        if (baseMaterial)
          customMaterial.color.copy(
            (baseMaterial as MeshStandardMaterial).color,
          );
      }
      customMaterial.needsUpdate = true;
    }, [materialType, customMaterial, baseMaterial]);

    return (
      <group ref={ref} {...props} dispose={null}>
        <group scale={0.1}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={customMaterial || baseMaterial}
            // A rotação original do seu Mesh
            rotation={[Math.PI / 2, 0, 0]}
            scale={[15, 15, 15]}
          >
            {/* FRENTE (DECAL) */}
            {textureUrl && (
              <ImageDecal
                url={textureUrl}
                scale={[1.8, 1.8, 0.05]}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0.1, 0]}
                debug={false}
              />
            )}

            {/* VERSO (TEXTO) */}
            {engravingText && (
              <TextDecal
                engravingText={engravingText}
                position={[0, -0.09, 0]}
                rotation={[-Math.PI / 2, Math.PI, 0]}
              />
            )}
          </mesh>
        </group>
      </group>
    );
  },
);

Coin.displayName = "Coin";

export default Coin;

useGLTF.preload("/models/Circle.glb");
