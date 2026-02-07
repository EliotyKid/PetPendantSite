import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const tokenRes = await fetch(
      `https://shopify.com/${env.NEXT_PUBLIC_STORE_ID}/auth/oauth/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: env.NEXT_PUBLIC_STOREFRONT_CLIENT_ID,
          code: code,
          redirect_uri: env.NEXT_PUBLIC_SHOPIFY_REDIRECT_URL,
        }).toString(),
      }
    );

    const tokens = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.json(tokens, { status: tokenRes.status });
    }

    const finalDestination = env.NEXT_PUBLIC_URL;
    
    const response = NextResponse.redirect(finalDestination); 

    // Salva o token
    response.cookies.set('customer_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}