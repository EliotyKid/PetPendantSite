'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  async function loadCart() {
    setIsLoading(true);
    const cartId = localStorage.getItem('cart_id');
    
    if (cartId) {
      try {
        const response = await fetch(`/api/cart?cartId=${cartId}`);
        const cartData = await response.json();
        
        if (cartData && cartData.id) {
          setCart(cartData);
        } else {
          // Se o cartId expirou na Shopify, limpamos o localStorage
          localStorage.removeItem('cart_id');
        }
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }
    setIsLoading(false); // Terminou de tentar carregar
  }
  loadCart();
}, []);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = async (variantId: string) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ cartId, variantId }),
      });

      const updatedCart = await response.json();

      if (updatedCart) {
        setCart(updatedCart);
        localStorage.setItem('cart_id', updatedCart.id);
        setIsOpen(true); // Abre o drawer para mostrar que funcionou
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      if (!cartId) return;

      // Se a quantidade for 0, você pode chamar uma rota de remoção ou tratar aqui
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        body: JSON.stringify({ cartId, lineId, quantity }),
      });

      const updatedCart = await response.json();
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  return (
    <CartContext.Provider value={{ isOpen, toggleCart, cart, setCart, addToCart, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);