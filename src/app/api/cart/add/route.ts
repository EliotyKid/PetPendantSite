import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { cartId, variantId } = await request.json();
  const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE;

  const endpoint = `${domain}/api/2024-01/graphql.json`;

  // Se não tem cartId, usamos cartCreate. Se tem, usamos cartLinesAdd.
  const query = cartId 
    ? `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
         cartLinesAdd(cartId: $cartId, lines: $lines) {
           cart { id totalQuantity checkoutUrl lines(first: 10) { nodes { id quantity merchandise { ... on ProductVariant { title price { amount currencyCode } product { title } image { url } } } } } cost { totalAmount { amount currencyCode } } }
         }
       }`
    : `mutation cartCreate($input: CartInput!) {
         cartCreate(input: $input) {
           cart { id totalQuantity checkoutUrl lines(first: 10) { nodes { id quantity merchandise { ... on ProductVariant { title price { amount currencyCode } product { title } image { url } } } } } cost { totalAmount { amount currencyCode } } }
         }
       }`;

  const variables = cartId 
    ? { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] }
    : { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token as string },
    body: JSON.stringify({ query, variables }),
  });

  const { data } = await res.json();
  const cart = data.cartCreate?.cart || data.cartLinesAdd?.cart;

  return NextResponse.json(cart);
}