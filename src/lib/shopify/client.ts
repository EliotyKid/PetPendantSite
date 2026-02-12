import {createStorefrontApiClient} from '@shopify/storefront-api-client';
import { env } from '@/env'

export const client = createStorefrontApiClient({
  storeDomain: env.NEXT_PUBLIC_STORE_DOMAIN!,
  apiVersion: '2026-01',
  publicAccessToken: env.NEXT_PUBLIC_STOREFRONT_PUBLIC_ACCESS_TOKE!,
});