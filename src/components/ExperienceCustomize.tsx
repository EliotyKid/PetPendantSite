"use client";

import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import Coin from "./models/Coin";
import Hearth from "./models/Heart";
import Tag from "./models/Tag";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(useGSAP);

interface ExperienceCustomizeProps {
  active: string;
  material: string;
  image: string | null;
  text: string | null;
}

export default function ExperienceCustomize({
  active,
  material,
  image,
  text,
}: ExperienceCustomizeProps) {
  const modelsRef = useRef<(Group | null)[]>([]);

  useGSAP(() => {
    const models = modelsRef.current.filter((c): c is Group => c !== null);
    if (models.length === 0) return;
    const [coin, heart, rectangle] = models;
    const modelMap: Record<string, Group> = {
      coin: coin,
      heart: heart,
      rectangle: rectangle,
    };

    Object.keys(modelMap).forEach((key) => {
      if (key !== active) {
        gsap.to(modelMap[key].scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        });
        gsap.to(modelMap[key].position, { y: -2, duration: 0.3 });
      }
    });

    const activeModel = modelMap[active];
    if (activeModel) {
      gsap.to(activeModel.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(activeModel.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.1,
      });
      gsap.to(activeModel.rotation, {
        y: activeModel.rotation.y + Math.PI * 2,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, [active]);

  useGSAP(() => {
    const models = modelsRef.current.filter((c): c is Group => c !== null);
    const [coin, heart, rectangle] = models;
    const modelMap: Record<string, Group> = {
      coin: coin,
      heart: heart,
      rectangle: rectangle,
    };
    const activeModel = modelMap[active];
    if (activeModel) {
      gsap.fromTo(
        activeModel.scale,
        { x: 1, y: 1, z: 1 },
        {
          x: 1.05,
          y: 1.05,
          z: 1.05,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
      );
    }
  }, [material]);

  const modelProps = {
    materialType: material,
    textureUrl: image,
    engravingText: text,
  };

  return (
    <>
      <Environment preset="sunset" environmentIntensity={0.6} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.25}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        position={[-5, 5, -5]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="white"
      />
      <pointLight position={[-5, 0, 2]} intensity={0.5} color="#fff0d6" />

      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
        enableZoom={false}
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group
          ref={(el) => {
            modelsRef.current[0] = el;
          }}
          scale={[0, 0, 0]}
        >
          <Coin {...modelProps} scale={[0.7, 0.7, 0.7]} />
        </group>

        <group
          ref={(el) => {
            modelsRef.current[1] = el;
          }}
          scale={[0, 0, 0]}
        >
          <Hearth {...modelProps} scale={[0.7, 0.7, 0.7]} />
        </group>

        <group
          ref={(el) => {
            modelsRef.current[2] = el;
          }}
          scale={[0, 0, 0]}
        >
          <Tag {...modelProps} scale={[0.7, 0.7, 0.7]} />
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
        color="#000000"
      />
    </>
  );
}
