import { cookies } from "next/headers";
import { getCustomer } from "@/lib/shopify";
import { env } from "@/env";

export default async function LoginLogout() {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;
  let customer = null;

  if (token) {
    customer = await getCustomer(token);
  }

  const params = new URLSearchParams({
    client_id: env.NEXT_PUBLIC_STOREFRONT_CLIENT_ID,
    response_type: 'code',
    scope: 'openid email https://api.customers.com/auth/customer.graphql',
    redirect_uri: env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URL,
    state: '12345',
    nounce: '67890',
  });

  const loginUrl = `https://shopify.com/${env.NEXT_PUBLIC_STORE_ID}/auth/oauth/authorize?${params.toString()}`;

  if (!customer) {
    return <a href={loginUrl}>Login</a>;
  }

  return (
    <div className="flex items-center gap-4">
      <span>Olá, {customer.firstName}</span>
      <a href="/api/auth/logout" className="text-sm underline">Sair</a>
    </div>
  )

}