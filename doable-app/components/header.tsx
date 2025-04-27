"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Settings, User, LockKeyhole } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FadeIn } from "@/components/animations/fade-in"

export function Header() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/sign-in" || pathname === "/register"

  if (isAuthPage) {
    return (
      <header className="border-b">
        <div className="container-fluid px-2 flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Doable</span>
          </Link>
        </div>
      </header>
    )
  }

  return (
    <FadeIn direction="down" duration={500}>
      <header className="border-b">
        <div className="container-fluid p-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Doable</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-110">
                <Avatar className="border-2 rounded-full border-black">
                  <AvatarImage src="https://framerusercontent.com/images/ILiJVdbpGwcv26LHWlZBFATw0g.jpg" width={40} height={40} alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in slide-in-from-top-5 duration-300">
              <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-primary/10">
                <Link href="/itineraries">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Itineraries</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-primary/10">
                <Link href="/preferences">
                  <User className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-primary/10">
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-primary/10">
                <Link href="/settings">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </FadeIn>
  )
}
