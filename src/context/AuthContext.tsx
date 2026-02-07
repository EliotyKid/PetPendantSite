// src/context/AuthContext.tsx
"use client"

import { createContext, useContext } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  customer: any | null
  loginUrl: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: AuthContextType
}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}