"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, Send, Bot, User, Loader2, Volume2, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

// Mock AI response generator
const generateAIResponse = (question: string) => {
  const responses: { [key: string]: string } = {
    pest: "For pest control, consider using neem oil spray or introduce beneficial insects like ladybugs.",
    crops: "Best crops for Indian climate: Wheat, Rice, Cotton, and Sugarcane. Consider soil type and season.",
    soil: "Improve soil health by crop rotation, adding organic compost, and maintaining proper pH levels.",
    irrigation: "Drip irrigation saves water and increases efficiency. Consider smart irrigation systems.",
    default: "I recommend consulting with local agricultural experts for detailed guidance specific to your region."
  }

  const lowerQuestion = question.toLowerCase()
  return (
    responses[
      Object.keys(responses).find(key => lowerQuestion.includes(key)) || 'default'
    ] + " Would you like more detailed information?"
  )
}

export function ChatbotScreen() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<{ 
    text: string
    sender: "user" | "bot"
    timestamp: number
  }[]>([])
  const [input, setInput] = useState("")
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognition = useRef<any>(null)

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognition.current = new SpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognition.current.onerror = () => {
        setIsListening(false)
        toast({
          title: "Speech recognition error",
          description: "Please check your microphone permissions",
          variant: "destructive"
        })
      }
    }
  }, [toast])

  const handleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop()
      setIsListening(false)
    } else {
      recognition.current?.start()
      setIsListening(true)
    }
  }

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return

    const newMessage = {
      text: input.trim(),
      sender: "user" as const,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsBotTyping(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const botResponse = {
        text: generateAIResponse(newMessage.text),
        sender: "bot" as const,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: Date.now()
      }])
    } finally {
      setIsBotTyping(false)
    }
  }, [input])

  const handleQuickAction = (topic: string) => {
    setInput(topic)
    setTimeout(sendMessage, 100)
  }

  return (
    <div className="py-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">AI Farming Assistant</h1>
        <p className="text-muted-foreground">24/7 agricultural support</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-green-600" />
            AgriBrain Assistant
          </CardTitle>
        </CardHeader>
        
        <ScrollArea className="flex-1">
          <CardContent className="space-y-4 p-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Bot className="w-6 h-6 text-green-600 mt-1" />
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-xl ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <User className="w-6 h-6 text-blue-600 mt-1" />
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-green-600" />
                <div className="bg-muted p-3 rounded-xl">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything about farming..."
              aria-label="Chat input"
            />
            <Button onClick={sendMessage} disabled={isBotTyping}>
              <Send className="w-4 h-4" />
            </Button>
            <Button 
              variant={isListening ? "destructive" : "outline"} 
              onClick={handleVoiceInput}
              disabled={!('webkitSpeechRecognition' in window)}
            >
              {isListening ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {["Pest Control", "Crop Selection", "Soil Health", "Water Management"].map((topic) => (
              <Button
                key={topic}
                variant="outline"
                className="h-auto py-2 text-xs md:text-sm"
                onClick={() => handleQuickAction(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {!('webkitSpeechRecognition' in window) && (
        <div className="flex items-center gap-2 text-yellow-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Voice input not supported in your browser</span>
        </div>
      )}
    </div>
  )
}