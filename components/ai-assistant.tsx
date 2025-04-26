"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiChatSheet } from "@/components/ai-chat-sheet"
import { VoiceInput } from "@/components/voice-input"
import { FadeIn } from "@/components/animations/fade-in"

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
        <div className="container py-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-2xl mx-auto">
            {/* Wrap Input and Icon for positioning */}
            <div className="relative flex-1">
              {/* Position Icon absolutely */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center pointer-events-none">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   className="h-5 w-5 text-muted-foreground"
                 >
                   {/* Assuming a search icon path */}
                   <path d="M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z" />
                   <path d="M16 16l4.5 4.5" />
                 </svg>
              </div>
              {/* Add padding to Input for icon space */}
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask our AI"
                className="pl-12 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50" // Added pl-12
              />
              <VoiceInput onResult={handleVoiceInput} />
              <Button type="submit" size="icon" className="transition-all duration-300 hover:shadow-md active:scale-95">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </FadeIn>

      {/* AI Chat Sheet */}
      <AiChatSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} initialQuery={query} />
    </>
  )
}
