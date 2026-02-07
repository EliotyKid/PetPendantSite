"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LoginLogout from "./LoginLogout";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import UserButton from "./UserButton";

gsap.registerPlugin(useGSAP);

type MenuLink = {
  path: string;
  label: string;
};

const MENU_LINKS: MenuLink[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/cart", label: "Cart" },
  { path: "/customize", label: "Customize" },
];

export default function Header() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.2,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(
          ".menu-link-item-holder",
          {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.inOut",
          },
          "-=0.75"
        );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!timelineRef.current) return;

    if ( isMenuOpen ){
      timelineRef.current.play()
      document.body.style.overflow = "hidden";
    }else{
      timelineRef.current.reverse()
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const { toggleCart, cart } = useCart();
  const quantity = cart?.totalQuantity || 0;

  return (
    <div ref={containerRef}>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 z-40 flex items-center justify-between px-8 py-6 w-svw">
        <Link href="/" className="text-xl text-secondary font-montserrat font-bold">
          Pet Pendant
        </Link>
        {/* <LoginLogout /> */}

        <div className="flex items-center gap-6">
          <UserButton />

          <button onClick={toggleCart} className="relative p-2 cursor-pointer">
            <ShoppingCart color="#5F4A8B"/>
            {quantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {quantity}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="text-sm uppercase tracking-wide text-primary cursor-pointer font-montserrat font-bold"
          >
            Menu
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div className="menu-overlay fixed inset-0 z-50 flex h-screen w-screen bg-primary px-8 py-6 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]">
        {/* LEFT ICON */}
        <div className="hidden flex-1 items-end md:flex">
          <button
            onClick={toggleMenu}
            className="absolute right-8 top-6 hidden cursor-pointer text-[64px] leading-none text-transparent hover:text-red md:block [-webkit-text-stroke:3px_#FEFACD] "
          >
            ×
          </button>
        </div>

        {/* CENTER CONTENT */}
        <div className="flex flex-2 flex-col justify-between pt-24 pb-16 md:pt-12 md:pb-0">
          {/* LINKS */}
          <nav className="space-y-4">
            {MENU_LINKS.map((link) => (
              <div key={link.path} className="menu-link-item w-fit overflow-hidden">
                <div
                  className="menu-link-item-holder"
                  onClick={toggleMenu}
                >
                  <Link
                    href={link.path}
                    className="block text-[56px] font-normal leading-[0.9] tracking-tight text-base md:text-[80px]"
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </nav>

          {/* INFO */}
          <div className="mt-12 flex gap-12 text-sm text-base">
            <div className="flex flex-col gap-1">
              <a href="#">X ↗</a>
              <a href="#">Instagram ↗</a>
              <a href="#">Facebook ↗</a>
            </div>
            <div className="flex flex-col gap-1">
              <p>info@petpendant.com</p>
              <p>31 3133 3232</p>
            </div>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="hidden flex-1 items-end justify-end md:flex">
          <p className="text-sm uppercase tracking-wide text-base">
            View Showreel
          </p>
        </div>

        {/* CLOSE (MOBILE) */}
        <button
          onClick={toggleMenu}
          className="absolute right-8 top-6 text-sm uppercase text-base md:hidden"
        >
          Close
        </button>
      </div>
    </div>
  );
}
