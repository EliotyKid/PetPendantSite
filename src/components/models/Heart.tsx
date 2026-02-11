"use client";

import {
  forwardRef,
  ComponentPropsWithoutRef,
  useMemo,
  useEffect,
} from "react";
import { useGLTF } from "@react-three/drei";
import { Group, MeshStandardMaterial } from "three";
import { ImageDecal } from "../ImageDecal"; // Verifique se o caminho do import está correto
import TextDecal from "../TextDecal"; // Verifique se o caminho do import está correto
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";

interface CustomModelProps extends ComponentPropsWithoutRef<"group"> {
  materialType?: string;
  textureUrl?: string | null;
  engravingText?: string | null;
}

const Hearth = forwardRef<Group, CustomModelProps>(
  ({ materialType, textureUrl, engravingText, ...props }, ref) => {
    const { nodes, materials } = useGLTF("/models/Heart.glb") as any;

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
            geometry={nodes.Plane.geometry}
            material={customMaterial || baseMaterial}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2 - 0.1, 0, 0]}
            scale={[7, 7, 7]}
          >
            {/* FRENTE (DECAL) */}
            {/* Nota: Talvez precise ajustar o scale do Decal dentro do componente ImageDecal para o formato Coração */}
            {textureUrl && (
              <ImageDecal
                url={textureUrl}
                scale={[3.2, 3.2, 0.05]}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0.15, -0.1]}
                debug={true}
              />
            )}

            {/* VERSO (TEXTO) */}
            {engravingText && <TextDecal engravingText={engravingText} />}
          </mesh>
        </group>
      </group>
    );
  },
);

Hearth.displayName = "Hearth";

export default Hearth;

useGLTF.preload("/models/Heart.glb");
