"use client"

import React, { createContext, useContext, Children, cloneElement, isValidElement, useRef } from "react"

interface StaggerContextValue {
  staggerDelay: number
  getDelayForIndex: (index: number) => number
}

const StaggerContext = createContext<StaggerContextValue | null>(null)

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  as?: React.ElementType
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  as: Component = "div",
}: StaggerContainerProps) {
  const contextValue = React.useMemo(
    () => ({
      staggerDelay,
      getDelayForIndex: (index: number) => index * staggerDelay,
    }),
    [staggerDelay],
  )

  // Map through children and clone them with an index prop
  const childrenWithIndices = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        "data-stagger-index": index,
      })
    }
    return child
  })

  return (
    <StaggerContext.Provider value={contextValue}>
      <Component className={className}>{childrenWithIndices}</Component>
    </StaggerContext.Provider>
  )
}

export function useStagger() {
  const context = useContext(StaggerContext)
  if (!context) {
    return { delay: 0 }
  }

  // Get the closest parent element with a data-stagger-index attribute
  const staggerIndexRef = useRef<number>(0)
  const isClient = typeof document !== "undefined" && typeof window !== "undefined"

  React.useLayoutEffect(() => {
    if (!isClient) {
      staggerIndexRef.current = 0
      return
    }

    let element = document.activeElement
    while (element && !element.hasAttribute("data-stagger-index")) {
      element = element.parentElement
    }

    if (element) {
      const staggerIndex = Number.parseInt(element.getAttribute("data-stagger-index") || "0", 10)
      staggerIndexRef.current = staggerIndex
    } else {
      staggerIndexRef.current = 0
    }
  }, [isClient])

  // For client-side rendering, we'll use a simpler approach
  // Each component will get a random delay between 0 and 5 * staggerDelay
  return {
    delay: Math.floor(Math.random() * 5) * context.staggerDelay,
  }
}
