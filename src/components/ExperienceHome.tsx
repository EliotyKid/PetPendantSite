"use client";

import { Environment, Float } from "@react-three/drei";
import Coin from "./models/Coin";
import { useRef } from "react";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ExperienceProps {
  isLoading: boolean;
}

const ExperienceHome = ({ isLoading }: ExperienceProps) => {
  const coinsRef = useRef<(Group | null)[]>([]);

  useGSAP(() => {
    if (isLoading) return;

    const coins = coinsRef.current.filter((c): c is Group => c !== null);
    if (coins.length === 0) return;

    const [leftCoin, centerCoin, rightCoin] = coins;

    // --- 1. INTRO (Mantive igual) ---
    const introTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 2.5 },
    });

    gsap.set(
      coins.map((c) => c.position),
      { y: -10 },
    );
    gsap.set(
      coins.map((c) => c.rotation),
      { x: Math.PI / 2, y: Math.PI },
    );
    gsap.set(
      coins.map((c) => c.scale),
      { x: 0.8, y: 0.8, z: 0.8 },
    );

    introTl
      .to(
        coins.map((c) => c.position),
        { y: 0, stagger: 0.15 },
      )
      .to(
        coins.map((c) => c.rotation),
        { x: 0, y: 0, stagger: 0.15 },
        "<",
      )
      .to(
        coins.map((c) => c.scale),
        { x: 1, y: 1, z: 1 },
        "<",
      );

    // --- 2. SCROLL ANIMATION (Ajuste de Velocidade) ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",

        // MUDANÇA PRINCIPAL AQUI:
        // "+=2500" significa: "Espalhe essa animação pelos próximos 2500 pixels de scroll"
        // Antes estava "100vh" (aprox 900px), por isso era muito rápido.
        end: "+=1500",

        // Scrub: 2 adiciona um "peso" (inércia).
        // Quando você para de scrollar, a moeda demora um pouquinho para parar.
        // Isso dá uma sensação de "premium" e fluidez.
        scrub: 2,
      },
    });

    // Animação de Saída
    // Usei 'power1.inOut' para começar devagar, acelerar no meio e desacelerar no fim

    // 1. Centro (Sobe e vai pro fundo)
    scrollTl.to(
      centerCoin.position,
      {
        y: 5, // Sobe menos agressivamente
        z: -8, // Vai para o fundo
        ease: "power1.inOut",
      },
      0,
    );

    scrollTl.to(
      centerCoin.rotation,
      {
        y: Math.PI,
        ease: "power1.inOut",
      },
      0,
    );

    // 2. Esquerda (Abre para esquerda)
    scrollTl.to(
      leftCoin.position,
      {
        x: -6, // Abre lateralmente
        y: 2,
        z: -4,
        ease: "power1.inOut",
      },
      0,
    );

    scrollTl.to(
      leftCoin.rotation,
      {
        z: -Math.PI / 3, // Inclina um pouco
        ease: "power1.inOut",
      },
      0,
    );

    // 3. Direita (Abre para direita)
    scrollTl.to(
      rightCoin.position,
      {
        x: 6,
        y: 2,
        z: -4,
        ease: "power1.inOut",
      },
      0,
    );

    scrollTl.to(
      rightCoin.rotation,
      {
        z: Math.PI / 3,
        ease: "power1.inOut",
      },
      0,
    );
  }, [isLoading]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <Environment preset="city" />

      {/* KEY LIGHT: Luz principal vinda da frente, diagonal superior esquerda */}
      {/* Aumentamos o Z para positivo (ex: 5) para ela bater na frente do objeto */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* FILL LIGHT: Luz de preenchimento vinda da direita para suavizar sombras */}
      <pointLight position={[5, 2, 3]} intensity={1.5} color="#ffffff" />

      {/* BACK LIGHT / RIM LIGHT: Mantemos para dar o contorno e destacar do fundo */}
      <spotLight
        position={[0, 10, -10]}
        intensity={2}
        angle={0.3}
        penumbra={1}
      />

      <pointLight position={[-10, 5, 5]} intensity={2} color="#ffffff" />

      {/* Float Wrapper: Mantém o movimento suave idle independente do scroll */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Coin
          ref={(el) => {
            coinsRef.current[0] = el;
          }}
          position={[-3.5, 0, -1]}
          rotation={[-0.1, 0.5, 0]}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <Coin
          ref={(el) => {
            coinsRef.current[1] = el;
          }}
          position={[0, 0, 1.5]}
          rotation={[-0.2, 0, 0]}
          scale={[1.1, 1.1, 1.1]}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
        <Coin
          ref={(el) => {
            coinsRef.current[2] = el;
          }}
          position={[3.5, 0, -1]}
          rotation={[-0.0, -0.5, 0]}
        />
      </Float>
    </>
  );
};

export default ExperienceHome;

