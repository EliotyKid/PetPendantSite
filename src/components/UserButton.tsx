"use client"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { User } from "lucide-react"
import { LoginButton } from "./LoginButton"
import LogoutButton from "./LogoutButton"
import PerfilButton from "./PerfilButton"

const UserButton = () =>  {
  const { isLoggedIn } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full"><User /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="flex gap-4 p-4">
        {isLoggedIn ? (
          <>
            <DropdownMenuItem className="p-0">
              <PerfilButton />
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <LogoutButton />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="p-0">
            <LoginButton />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton;