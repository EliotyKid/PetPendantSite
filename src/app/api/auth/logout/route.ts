import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 1. Definir a URL de destino final (sua Home no Dev Tunnel)
  const baseUrl = "https://35n6x33m-3000.brs.devtunnels.ms/";

  // 2. Criar a resposta de redirecionamento
  const response = NextResponse.redirect(baseUrl);

  // 3. Limpar o cookie definindo a expiração para o passado
  response.cookies.set('customer_token', '', {
    path: '/',
    expires: new Date(0), // Data no passado remove o cookie imediatamente
  });
  
  return response;
}