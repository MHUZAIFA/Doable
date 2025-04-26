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
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask our AI"
              className="flex-1 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
              startIcon={
                <div className="flex h-10 w-10 items-center justify-center">
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              }
            />
            <VoiceInput onResult={handleVoiceInput} />
            <Button type="submit" size="icon" className="transition-all duration-300 hover:shadow-md active:scale-95">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </FadeIn>

      {/* AI Chat Sheet */}
      <AiChatSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} initialQuery={query} />
    </>
  )
}
