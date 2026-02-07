'use client';

import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from 'react';

gsap.registerPlugin(useGSAP);

export default function CartDrawer() {
  const { isOpen, toggleCart, cart, updateQuantity, isLoading } = useCart();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const cartItems = cart?.lines?.nodes || [];


  useGSAP(() => {
    // ESTADO INICIAL
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(".cart-overlay", { opacity: 0 });
    gsap.set(".cart-panel", { 
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" 
    });
    // Itens começam um pouco mais para a direita e invisíveis
    gsap.set(".cart-anim-item", { x: 30, opacity: 0 });

    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(".cart-overlay", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(".cart-panel", {
        duration: 0.8,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      }, "-=0.2")
      .to(".cart-anim-item", {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.04, // Intervalo bem curto para uma sensação de "onda"
        ease: "power3.out",
      }, "-=0.4");
  }, { scope: containerRef });

  useEffect(() => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.play();
      // document.body.style.overflow = "hidden";
    } else {
      timelineRef.current.reverse();
      // document.body.style.overflow = "";
    }
  }, [isOpen]);

  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-100 ${!isOpen && 'pointer-events-none '} opacity-0`}
    >
      <div className="cart-overlay absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={toggleCart} />

      <div className="cart-panel absolute right-0 top-0 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="cart-anim-item flex items-center gap-2">
            <ShoppingBag size={20} color='#5F4A8B'/>
            <h2 className="text-xl font-bold italic uppercase tracking-tighter text-primary">Seu Carrinho</h2>
          </div>
          <button
            onClick={toggleCart}
            className="cart-anim-item absolute right-8 hidden cursor-pointer text-[64px] leading-none text-transparent md:block [-webkit-text-stroke:3px_#B23A48] "
          >
            ×
          </button>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-20 cart-anim-item text-secondary">Carregando...</div>
          ) : cartItems.length === 0 ? (
            <div className="cart-anim-item text-center py-20 text-secondary">Sua sacola está vazia</div>
          ) : (
            cartItems.map((item: any) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Imagem do item também anima */}
                <div className="cart-anim-item w-24 h-28 bg-gray-100 rounded-sm border shrink-0 overflow-hidden">
                  <img src={item.merchandise.image.url} className="w-full h-full object-cover" alt="" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="cart-anim-item font-bold text-xs uppercase leading-tight mb-1 text-secondary ">
                      {item.merchandise.product.title}
                    </h3>
                    <p className="cart-anim-item text-[10px] text-secondary uppercase tracking-widest">
                      {item.merchandise.title}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Controles de quantidade animam separadamente */}
                    <div className="cart-anim-item flex items-center border rounded-full px-3 py-1 gap-4 scale-90 -ml-3 bg-white ">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary transition-colors hover:scale-125">
                        <Minus size={14}/>
                      </button>
                      <span className="text-xs font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary transition-colors hover:scale-125">
                        <Plus size={14}/>
                      </button>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <button 
                        onClick={() => updateQuantity(item.id, 0)} 
                        className="cart-anim-item text-secondary hover:text-red mb-2 transition-colors"
                      >
                        <Trash2 size={14}/>
                      </button>
                      <span className="cart-anim-item font-bold text-sm tracking-tighter">
                        R$ {item.merchandise.price.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER CHECKOUT */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50/50 text-secondary">
            <div className="flex justify-between mb-2 cart-anim-item">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Subtotal</span>
              <span className="text-sm font-medium">R$ {cart.cost?.totalAmount?.amount}</span>
            </div>
            
            <div className="flex justify-between mb-6 cart-anim-item">
              <span className="font-black text-xl italic tracking-tighter">TOTAL</span>
              <span className="font-black text-xl tracking-tighter">R$ {cart.cost?.totalAmount?.amount}</span>
            </div>

            <button className="cart-anim-item w-full bg-black text-white py-5 rounded-sm font-black hover:bg-green transition-all uppercase tracking-[0.2em] text-[11px] active:scale-[0.98]">
              Finalizar Compra
            </button>
            
            <p className="cart-anim-item text-center text-[9px] text-gray-400 mt-4 uppercase">
              Taxas e frete calculados no checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}