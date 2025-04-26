"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ children, className, delay = 0, duration = 300, direction = "up" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getDirectionClasses = () => {
    switch (direction) {
      case "up":
        return "translate-y-4"
      case "down":
        return "translate-y-[-1rem]"
      case "left":
        return "translate-x-4"
      case "right":
        return "translate-x-[-1rem]"
      default:
        return ""
    }
  }

  return (
    <div
      className={cn(
        "transition-all",
        isVisible ? "opacity-100 transform-none" : `opacity-0 ${getDirectionClasses()}`,
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
