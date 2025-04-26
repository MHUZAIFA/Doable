"use client"

import { useState, useEffect, useCallback } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface VoiceInputProps {
  onResult: (text: string) => void
  className?: string
}

// Declare SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    length: number
    item(index: number): SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionError
  }

  type SpeechRecognitionError =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported"
}

export function VoiceInput({ onResult, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const { toast } = useToast()

  // Create a reference to store the SpeechRecognition instance
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      return
    }

    const instance = new SpeechRecognition()

    // Configure the recognition
    instance.continuous = false
    instance.interimResults = false
    instance.lang = "en-US"

    // Set up event handlers
    instance.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      stopListening()
    }

    instance.onerror = (event) => {
      console.error("Speech recognition error", event.error)

      if (event.error === "not-allowed") {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Voice input error",
          description: "There was an error with voice recognition. Please try again.",
          variant: "destructive",
        })
      }

      stopListening()
    }

    instance.onend = () => {
      setIsListening(false)
    }

    // Store the instance
    setRecognition(instance)

    // Cleanup
    return () => {
      if (isListening) {
        instance.stop()
      }
    }
  }, [onResult, toast])

  const startListening = useCallback(() => {
    if (!recognition) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Try using Chrome or Edge.",
      })
      return
    }

    setIsInitializing(true)

    // Request microphone permission
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsInitializing(false)
        setIsListening(true)
        recognition.start()

        toast({
          title: "Listening...",
          description: "Speak now. Recording will stop automatically after you finish speaking.",
        })
      })
      .catch((error) => {
        console.error("Microphone access error:", error)
        setIsInitializing(false)
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        })
      })
  }, [recognition, toast])

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }, [recognition, isListening])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <Button
      type="button"
      size="icon"
      variant={isListening ? "default" : "ghost"}
      className={`${className} transition-all duration-300 ${isListening ? "animate-pulse" : "hover:bg-primary/10"} active:scale-95`}
      onClick={toggleListening}
      disabled={isInitializing}
    >
      {isInitializing ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isListening ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
      <span className="sr-only">{isListening ? "Stop voice input" : "Start voice input"}</span>
    </Button>
  )
}
