import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // Variáveis do Cliente (Devem começar com NEXT_PUBLIC_)
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_STORE_ID: z.string(),
  NEXT_PUBLIC_STORE_DOMAIN: z.string(),
  NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE: z.string(), // Verifique se falta um 'N' no final
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_SHOPIFY_REDIRECT_URL: z.string(),

  // Variáveis do Servidor (NÃO use no Cliente)
  NEXT_PUBLIC_STOREFRONT_PRIVATE_ACCESS_TOKE: z.string().optional(),
  NEXT_PUBLIC_STOREFRONT_CLIENT_ID: z.string().optional(),
});

// No Next.js, para o cliente ver as variáveis, você deve mapeá-las manualmente
// para que o compilador faça a substituição estática.
export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_STORE_ID: process.env.NEXT_PUBLIC_STORE_ID,
  NEXT_PUBLIC_STORE_DOMAIN: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE:
    process.env.NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SHOPIFY_REDIRECT_URL:
    process.env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URL,

  // Estas só estarão presentes no Servidor
  NEXT_PUBLIC_STOREFRONT_PRIVATE_ACCESS_TOKE:
    process.env.NEXT_PUBLIC_STOREFRONT_PRIVATE_ACCESS_TOKE,
  NEXT_PUBLIC_STOREFRONT_CLIENT_ID:
    process.env.NEXT_PUBLIC_STOREFRONT_CLIENT_ID,
});
