// src/lib/auth/get-login-url.ts
import { env } from "@/env"

export function getLoginUrl() {
  const params = new URLSearchParams({
    client_id: env.NEXT_PUBLIC_STOREFRONT_CLIENT_ID!,
    response_type: "code",
    scope: "openid email https://api.customers.com/auth/customer.graphql",
    redirect_uri: env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URL!,
    state: "12345",
    nonce: "67890",
  })

  return `https://shopify.com/${env.NEXT_PUBLIC_STORE_ID!}/auth/oauth/authorize?${params.toString()}`
}