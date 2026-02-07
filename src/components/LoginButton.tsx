"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  const { isLoggedIn, loginUrl } = useAuth()

  if (isLoggedIn || !loginUrl) return null

  return (
    <Button asChild variant="default" className="w-full h-full font-montserrat font-medium text-base">
      <a href={loginUrl} className="font-montserrat font-medium text-base">Login</a>
    </Button>
  )
}