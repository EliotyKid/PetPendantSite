import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { cartId, lineId, quantity } = await request.json();
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
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
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
        }
      `,
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    }),
  });

  const { data } = await res.json();
  return NextResponse.json(data?.cartLinesUpdate?.cart);
}