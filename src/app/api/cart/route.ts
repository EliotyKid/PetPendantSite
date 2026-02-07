import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get('cartId');

  if (!cartId) return NextResponse.json(null);

  const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE;

  const res = await fetch(`${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({
      query: `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            totalQuantity
            lines(first: 10) {
              nodes {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    price { amount currencyCode }
                    product { title }
                    image { url }
                  }
                }
              }
            }
            cost {
              totalAmount { amount currencyCode }
              subtotalAmount { amount currencyCode }
            }
          }
        }
      `,
      variables: { cartId },
    }),
  });

  const { data } = await res.json();
  // Retornamos exatamente o objeto cart
  return NextResponse.json(data?.cart || null);
}