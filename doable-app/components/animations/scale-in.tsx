"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function ScaleIn({ children, className, delay = 0, duration = 300 }: ScaleInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn("transition-all", isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95", className)}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
