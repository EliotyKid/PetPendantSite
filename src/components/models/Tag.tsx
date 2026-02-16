"use client";

import {
  forwardRef,
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
} from "react";
import { useGLTF } from "@react-three/drei";
import { Group, MeshStandardMaterial } from "three";
import { ImageDecal } from "../ImageDecal"; // Verifique se o caminho do import está correto
import TextDecal from "../TextDecal"; // Verifique se o caminho do import está correto

interface CustomModelProps extends ComponentPropsWithoutRef<"group"> {
  materialType?: string;
  textureUrl?: string | null;
  engravingText?: string | null;
}

const Tag = forwardRef<Group, CustomModelProps>(
  ({ materialType, textureUrl, engravingText, ...props }, ref) => {
    const { nodes, materials } = useGLTF("/models/Tag.glb") as any;

    // --- LÓGICA DE MATERIAL ---
    const baseMaterial = materials.Gold || Object.values(materials)[0];

    const customMaterial = useMemo(() => {
      if (!baseMaterial) return null;
      return baseMaterial.clone() as MeshStandardMaterial;
    }, [baseMaterial]);

    useEffect(() => {
      if (!customMaterial) return;

      // Propriedades físicas para realismo
      customMaterial.metalness = 0.2;
      customMaterial.roughness = 0.25;

      if (materialType === "rose") {
        customMaterial.color.set("#B76E79"); // Cor ajustada igual ao Coin
      } else if (materialType === "silver") {
        customMaterial.color.set("#ECECEC");
        customMaterial.roughness = 0.15;
      } else {
        // Gold Default
        if (baseMaterial) {
          customMaterial.color.copy(
            (baseMaterial as MeshStandardMaterial).color,
          );
        }
      }

      customMaterial.needsUpdate = true;
    }, [materialType, customMaterial, baseMaterial]);

    return (
      <group ref={ref} {...props} dispose={null}>
        <group scale={0.1}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry} // Confirmei no seu arquivo, é "Circle"
            material={customMaterial || baseMaterial}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]} // A mesh já está girada!
            scale={[12, 12, 12]}
          >
            {textureUrl && (
              <ImageDecal
                url={textureUrl}
                debug={false} // <--- LIGADO
                rotation={[Math.PI / 2, 0, Math.PI / 2]} // Girado para alinhar com a face
                scale={[2, 2, 0.05]} // Retangular e profundo
                position={[0, 0.1, 0]}
              />
            )}
            {/* ... */}
            {engravingText && (
              <TextDecal
                engravingText={engravingText}
                position={[0, -0.09, 0]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              />
            )}
          </mesh>
        </group>
      </group>
    );
  },
);

Tag.displayName = "Tag";

export default Tag;

useGLTF.preload("/models/Tag.glb");
