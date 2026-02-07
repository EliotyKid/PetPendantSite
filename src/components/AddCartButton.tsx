'use client';
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await addToCart(variantId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={loading}
      className="w-full bg-secondary text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition disabled:bg-gray-400"
    >
      {loading ? 'ADICIONANDO...' : 'ADICIONAR AO CARRINHO'}
    </button>
  );
}