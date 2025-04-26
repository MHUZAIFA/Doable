"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, X } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VoiceInput } from "@/components/voice-input"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"

interface AiChatSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialQuery: string
}

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AiChatSheet({ isOpen, onOpenChange, initialQuery }: AiChatSheetProps) {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialQuery) {
      return [
        {
          id: "initial-query",
          content: initialQuery,
          role: "user",
          timestamp: new Date(),
        },
        {
          id: "initial-response",
          content: getAiResponse(initialQuery),
          role: "assistant",
          timestamp: new Date(),
        },
      ]
    }
    return []
  })
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Update messages when initialQuery changes and sheet is opened
  useEffect(() => {
    if (isOpen && initialQuery && !messages.length) {
      setMessages([
        {
          id: "initial-query",
          content: initialQuery,
          role: "user",
          timestamp: new Date(),
        },
        {
          id: "initial-response",
          content: getAiResponse(initialQuery),
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, initialQuery, messages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: query,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: getAiResponse(query),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)

    setQuery("")
  }

  const handleVoiceInput = (text: string) => {
    setQuery(text)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[85vh] flex flex-col p-0">
        <SheetHeader className="px-4 py-2 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Doable AI Assistant</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-all duration-200 hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4">
          <StaggerContainer staggerDelay={150}>
            <div className="space-y-4 mb-4">
              {messages.map((message, index) => (
                <FadeIn
                  key={message.id}
                  direction={message.role === "assistant" ? "left" : "right"}
                  delay={index * 150}
                  duration={400}
                >
                  <div
                    className={`flex items-start gap-3 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <Avatar
                      className={`${message.role === "assistant" ? "bg-primary" : "bg-muted"} transition-all duration-300 hover:scale-110`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] transition-all duration-300 hover:shadow-md ${
                        message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
              {isLoading && (
                <FadeIn direction="left" duration={300}>
                  <div className="flex items-start gap-3">
                    <Avatar className="bg-primary">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
              <div ref={messagesEndRef} />
            </div>
          </StaggerContainer>
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask our AI..."
              className="flex-1 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
              disabled={isLoading}
            />
            <VoiceInput onResult={handleVoiceInput} />
            <Button type="submit" size="icon" disabled={isLoading} className="transition-all duration-200">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Helper function to generate mock AI responses
function getAiResponse(query: string): string {
  const responses = [
    "Based on your interests, I recommend checking out the Mountain Trail hiking experience. It's very popular this time of year  I recommend checking out the Mountain Trail hiking experience. It's very popular this time of year!",
    "I've found several activities that might interest you. The City Museum Tour offers a great cultural experience, or if you prefer outdoors, the Kayaking Adventure at Clear Lake is highly rated.",
    "For a full day itinerary, I suggest starting with the Botanical Garden Tour in the morning, followed by lunch at The Rustic Table, and then the City Museum Tour in the afternoon.",
    "If you're looking for indoor activities due to the weather, the Art Gallery Exhibition and Escape Room Challenge are both excellent options nearby.",
    "The Rustic Table has excellent reviews for dinner. Would you like me to check if they have availability this evening?",
    "For a family-friendly day, I recommend the Botanical Garden Tour followed by the Virtual Reality Experience. Both are suitable for all ages.",
    "Based on your location, there are 5 highly-rated restaurants within walking distance. The closest is Sakura Sushi, about 5 minutes away.",
  ]

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)]
}
