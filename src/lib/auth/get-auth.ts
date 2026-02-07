// src/lib/auth/get-auth.ts
import { cookies } from "next/headers"
import { getCustomer } from "@/lib/shopify"
import { getLoginUrl } from "./get-login-url"

export async function getAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("customer_token")?.value

  if (!token) {
    return {
      isLoggedIn: false,
      customer: null,
      loginUrl: getLoginUrl(),
    }
  }

  const customer = await getCustomer(token)

  if (!customer) {
    return {
      isLoggedIn: false,
      customer: null,
      loginUrl: getLoginUrl(),
    }
  }

  return {
    isLoggedIn: true,
    customer,
    loginUrl: null,
  }
}