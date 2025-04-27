"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Clock, ChevronRight, X, Navigation } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { AiAssistant } from "./ai-assistant"

interface SearchResultsSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchResultsSheet({ isOpen, onOpenChange }: SearchResultsSheetProps) {
  // Mock itinerary data - in a real app, this would come from an API
  const itinerarySteps = [
    {
      type: "start",
      title: "Your Location",
      description: "Current location",
      time: "Start",
      icon: "location",
    },
    {
      type: "travel",
      title: "Travel by car",
      description: "15 minutes (5.2 miles)",
      icon: "car",
    },
    {
      type: "activity",
      title: "Mountain View Park",
      description: "Hiking at Mountain Trail",
      time: "3 hours",
      rating: 4.7,
      price: "$25 per person",
      icon: "activity",
    },
    {
      type: "travel",
      title: "Travel by car",
      description: "10 minutes (3.8 miles)",
      icon: "car",
    },
    {
      type: "food",
      title: "The Rustic Table",
      description: "Lunch reservation",
      time: "1.5 hours",
      rating: 4.7,
      price: "$$$",
      icon: "food",
    },
    {
      type: "travel",
      title: "Walk",
      description: "5 minutes (0.3 miles)",
      icon: "walk",
    },
    {
      type: "activity",
      title: "City Museum",
      description: "Museum Tour",
      time: "2 hours",
      rating: 4.5,
      price: "$15 per person",
      icon: "activity",
    },
    {
      type: "end",
      title: "Return to Your Location",
      description: "End of itinerary",
      time: "End",
      icon: "location",
    },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <SheetHeader className="bg-background pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Itinerary Results</SheetTitle>
          </div>
        </SheetHeader>

        <FadeIn direction="up" duration={500}>
          <div className="mt-6 space-y-2 d-flex" style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "1rem" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Suggested Itinerary</h3>
              <Badge variant="outline" className="flex items-center gap-1 animate-pulse">
                <Clock className="h-3 w-3" />
                <span>Full day</span>
              </Badge>
            </div>

            <StaggerContainer staggerDelay={80}>
              <div className="space-y-0 mt-4">
                {itinerarySteps.map((step, index) => (
                  <FadeIn key={index} direction="up" delay={index * 80} duration={400} className="relative">
                    {/* Connecting line */}
                    {index < itinerarySteps.length - 1 && (
                      <div
                        className="absolute left-6 top-8 h-full w-0.5 bg-border"
                        style={{ transform: "translateX(-50%)" }}
                      />
                    )}

                    <div className="flex items-start gap-4 py-4">
                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${step.type === "start" || step.type === "end"
                            ? "bg-primary text-primary-foreground"
                            : step.type === "travel"
                              ? "bg-muted"
                              : step.type === "food"
                                ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                      >
                        {step.type === "start" || step.type === "end" ? (
                          <MapPin className="h-6 w-6" />
                        ) : step.type === "travel" ? (
                          <Navigation className="h-6 w-6" />
                        ) : step.type === "food" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                            <path d="M5 8h8" />
                            <path d="M5 12h8" />
                            <path d="M5 16h8" />
                            <path d="M3 8v8" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m16 12-4-4-4 4" />
                            <path d="m8 12 4 4 4-4" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.title}</h4>
                          {step.time && <span className="text-sm text-muted-foreground">{step.time}</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        {(step.rating || step.price) && (
                          <div className="flex items-center gap-3 mt-1">
                            {step.rating && (
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-4 w-4 text-yellow-400"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span className="ml-1 text-sm">{step.rating}</span>
                              </div>
                            )}
                            {step.price && <span className="text-sm">{step.price}</span>}
                          </div>
                        )}
                      </div>

                      {/* Action button for activities and food */}
                      {(step.type === "activity" || step.type === "food") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 transition-all duration-200 hover:bg-primary/10"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {index < itinerarySteps.length - 1 && step.type !== "travel" && <Separator />}
                  </FadeIn>
                ))}
              </div>
            </StaggerContainer>
          </div>

          <AiAssistant isAbsolute={false} />
        </FadeIn>
      </SheetContent>
    </Sheet>
  )
}
