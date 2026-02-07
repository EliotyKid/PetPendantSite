import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_STORE_ID: z.string(),
  NEXT_PUBLIC_STORE_DOMAIN: z.string(),
  NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE: z.string(),
  NEXT_PUBLIC_STOREFRONT_PRIVATE_ACCESS_TOKE: z.string(),
  NEXT_PUBLIC_STOREFRONT_CLIENT_ID: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_SHOPIFY_REDIRECT_URL: z.string(),
});

export const env = envSchema.parse(process.env);
