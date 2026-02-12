import { input } from "framer-motion/client";
import { client } from "./client";
import {
  productByHandleQuery,
  productQuery,
  addToCartMutation,
  cartCreateMutation,
  getTheCart,
} from "./queries";
import { env } from "@/env";

export async function getProducts({ first = 10, after = null } = {}) {
  const { data } = await client.request(productQuery, {
    variables: {
      first,
      after,
    },
  });

  return data.products;
}

export async function getProductByHandle(handle: string) {
  const { data } = await client.request(productByHandleQuery, {
    variables: { handle },
  });

  return data.productByHandle;
}

export async function getCart(cartId: string) {
  const { data } = await client.request(getTheCart, {
    variables: { cartId },
  });
  return data.cart;
}

export async function createCart(lines: any[] = []) {
  const response = await client.request(cartCreateMutation, {
    variables: {
      input: {
        lines: lines,
      },
    },
  });

  if (response.errors || !response.data) {
    console.error("Shopify API Error:", response.errors);
    throw new Error("Falha ao criar carrinho");
  }

  return response.data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string) {
  const { data } = await client.request(addToCartMutation, {
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity: 1 }],
    },
  });
  return data.cartLinesAdd.cart;
}

export async function getCustomer(accessToken: string) {
  try {
    const res = await fetch(
      `https://shopify.com/${env.NEXT_PUBLIC_STORE_ID!}/account/customer/api/unstable/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Tente enviar o token exatamente como ele está no cookie
          Authorization: accessToken,
        },
        body: JSON.stringify({
          query: `query { customer { firstName lastName } }`,
        }),
      },
    );

    const result = await res.json();

    if (result.errors) {
      console.error(
        "Erro GraphQL da Shopify:",
        JSON.stringify(result.errors, null, 2),
      );
      return null;
    }

    return result.data?.customer || null;
  } catch (e) {
    console.error("Erro na requisição getCustomer:", e);
    return null;
  }
}

