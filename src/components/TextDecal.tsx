import { Text } from "@react-three/drei";

interface TextDecalProps {
  engravingText: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const TextDecal = ({ engravingText, position, rotation, scale }: TextDecalProps) => {
  return ( 
    <Text
      // Posição Y negativa = Costas do modelo
      position={position || [0, -.15 , 0]} 

      // SOLUÇÃO DO PROBLEMA 2:
      // [-Math.PI / 2, Math.PI, Math.PI]
      // 1. -Math.PI/2 no X: Deita o texto para alinhar com a face.
      // 2. Math.PI no Y: Vira o texto para "trás".
      // 3. Math.PI no Z: Gira 180 graus (resolve o ponta-cabeça).
      rotation={rotation || [-Math.PI / 2, Math.PI, 0]}
      scale={scale || [2, 2, 0.15]}
      fontSize={0.12} 
      maxWidth={1.1}
      lineHeight={1}
      letterSpacing={0.05}
      color= "#000"
      anchorX="center"
      anchorY="middle"
    >
      {engravingText}
    </Text>
   );
}
 
export default TextDecal