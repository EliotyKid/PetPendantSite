export const productQuery = `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          handle
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const productByHandleQuery = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;


export const getTheCart = `
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
                id
                title
                image { url }
                price { amount }
                product { title }
              }
            }
          }
        }
        cost {
          totalAmount { amount, currencyCode }
        }
      }
    }
  `;

export const cartCreateMutation = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const addToCartMutation = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product { title }
              }
            }
          }
        }
      }
    }
  }
`;