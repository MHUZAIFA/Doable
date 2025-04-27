"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AiChatSheet } from "@/components/ai-chat-sheet"
import { VoiceInput } from "@/components/voice-input"
import { FadeIn } from "@/components/animations/fade-in"
import { SearchResultsSheet } from "./search-results-sheet"

export function AiAssistant() {
  const [query, setQuery] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open the AI chat sheet with the current query
    if (query.trim()) {
      setIsSheetOpen(true)
    }
  }

  const handleVoiceInput = (text: string) => {
    setQuery(text)
  }

  return (
    <>
      <FadeIn direction="up" duration={500}>
        <div className="absolute w-100 container-fluid p-3 md:flex md:justify-center md:items-center" style={{ bottom: "80px", margin: "0 auto", left: "0", right: "0", zIndex: 100 }}>
          <form onSubmit={handleSubmit}>
            {/* Wrap Input and Icon for positioning */}
            <div
              className="flex flex-row items-center w-full transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
              style={{ border: "1px solid #ccc", borderRadius: "8px", minWidth: "calc(100vw - 700px)", backgroundColor: "hsl(var(--background));" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-muted-foreground ml-2"
              >
                <path d="M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask our AI"
                className="flex-1 border-none px-2 focus:ring-0 focus:outline-none"
              />
              <VoiceInput onResult={handleVoiceInput} />
              <Button type="submit" size="icon" className="transition-all duration-300 hover:shadow-md active:scale-95" disabled={!query.trim()} style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </FadeIn>

      {/* AI Chat Sheet */}
      <SearchResultsSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        searchQuery={query}
        onSearchChange={function (query: string): void {
          throw new Error("Function not implemented.")
        }} />
    </>
  )
}
