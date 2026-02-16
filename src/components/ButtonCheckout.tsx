"use client";

import { createCart } from "@/lib/shopify";
import { UploadImage } from "@/lib/utils";
import { useState } from "react";

type Material = "gold" | "silver" | "rose";
type Shape = "coin" | "heart" | "rectangle";
type EngravingOption = "withBackEngraving" | "withoutBackEngraving";

const PRODUCT_IDS: Record<
  Shape,
  Record<EngravingOption, Record<Material, string>>
> = {
  heart: {
    withoutBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312473842051",
      gold: "gid://shopify/ProductVariant/57312473874819",
      silver: "gid://shopify/ProductVariant/57312473907587",
    },
    withBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312473940355",
      gold: "gid://shopify/ProductVariant/57312473973123",
      silver: "gid://shopify/ProductVariant/57312474005891",
    },
  },
  rectangle: {
    withoutBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312474956163",
      gold: "gid://shopify/ProductVariant/57312474988931",
      silver: "gid://shopify/ProductVariant/57312475021699",
    },
    withBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312475054467",
      gold: "gid://shopify/ProductVariant/57312475087235",
      silver: "gid://shopify/ProductVariant/57312475120003",
    },
  },
  coin: {
    withoutBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312478855555",
      gold: "gid://shopify/ProductVariant/57312478888323",
      silver: "gid://shopify/ProductVariant/57312478921091",
    },
    withBackEngraving: {
      rose: "gid://shopify/ProductVariant/57312478953859",
      gold: "gid://shopify/ProductVariant/57312478986627",
      silver: "gid://shopify/ProductVariant/57312479019395",
    },
  },
};

interface ButtonCheckoutProps {
  shape: Shape;
  material: Material;
  engravingOption: EngravingOption;
  imageFile: File | null;
}

const ButtonCheckout = ({
  shape,
  material,
  engravingOption,
  imageFile,
}: ButtonCheckoutProps) => {
  const [loading, setLoading] = useState(false);

  const HandleBuyNow = async () => {
    if (!imageFile) {
      alert("Por favor selecione uma imagem");
      return;
    }
    setLoading(true);

    try {
      const cloudinaryUrl = await UploadImage(imageFile);

      if (!cloudinaryUrl) {
        throw new Error("Falha ao carregar a imagem para o servidor.");
      }

      const variantId = PRODUCT_IDS[shape][engravingOption][material];

      const lines = [
        {
          merchandiseId: variantId,
          quantity: 1,
          attributes: [
            { key: "Shape", value: shape },
            { key: "Material", value: material },
            { key: "_Image_Url", value: cloudinaryUrl },
            { key: "Customization", value: cloudinaryUrl },
          ],
        },
      ];

      const cart = await createCart(lines);

      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Erro ao processar compra:", error);
      alert("Ocorreu um erro ao processar o seu pedido. Tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={HandleBuyNow}
      disabled={loading}
      className="bg-green text-white px-8 py-3 rounded-full font-bold hover:scale=105 transition-transform disabled:opacity-50"
    >
      {loading ? "Processando..." : "BUY NOW"}
    </button>
  );
};

export default ButtonCheckout;
