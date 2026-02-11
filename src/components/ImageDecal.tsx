"use client";
import { Decal, useTexture } from "@react-three/drei";

type ImageDecalProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  debug?: boolean; // Nova prop para ligar/desligar a caixa amarela
};

export function ImageDecal({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  debug = false,
}: ImageDecalProps) {
  const texture = useTexture(url);

  // FIX: Às vezes o GLTF e a Textura discordam sobre o que é "cima"
  // Se a imagem aparecer de cabeça para baixo, mude para true.
  texture.flipY = false;
  texture.anisotropy = 16;

  return (
    <Decal
      debug={debug} // Mostra o Wireframe Amarelo se true
      position={position}
      rotation={rotation}
      scale={scale}
      map={texture}
    >
      <meshPhysicalMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-1}
        map={texture}
        // TRUQUE: Se a textura não carregar, ele fica Vermelho/Rosa.
        // Se carregar, o map cobre a cor.
        roughness={0.2}
        metalness={0.5}
        polygonOffsetUnits={-1}
      />
    </Decal>
  );
}

