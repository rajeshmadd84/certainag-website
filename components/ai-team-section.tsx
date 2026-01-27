"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Clock, Zap } from "lucide-react"

const leftConversations = [
  {
    title: "Crop Advice Inquiry",
    messages: [
      { text: "Suggest to me the best crop to grow?", sender: "farmer", delay: 0 },
      {
        text: "In Hitec city, Serilingampalli, In January, You might consider planning crops like:",
        sender: "CertainAg",
        delay: 1000,
      },
      {
        text: "1. Wheat: This is one of the most popular Rabi crops. it thrives in the cooler temperatures of January and can yield well if managed properly.",
        sender: "CertainAg",
        delay: 2500,
      },
      {
        text: "2. Chickpeas (bengal gram): Another excellent option, chickpeas are drought-resistant can be quite profitable.",
        sender: "CertainAg",
        delay: 3500,
      },
      {
        text: "3. Mustard: This oil seed crop is also suitable for this time of the year. It requires less water.",
        sender: "CertainAg",
        delay: 5000,
      },
      {
        text: "4. Barley: If you are looking for something a bit different, barley is a hardy crop that can do well in the cooler months.",
        sender: "CertainAg",
        delay: 6000,
      },
    ],
  },
]

const rightConversations = [
  {
    title: "Disease Diagnosis",
    messages: [
      { text: "Suggest to me the best crop to grow?", sender: "farmer", delay: 0 },
      {
        text: "what is your soil type and what is your previous crop?",
        sender: "CertainAg",
        delay: 1000,
      },
      {
        text: "Loami soil and  Black gram",
        sender: "farmer",
        delay: 2500,
      },
      {
        text: "I’ve analysed your current soil health and your previous crop cycle",
        sender: "CertainAg",
        delay: 4000,
      },
      
      {
        text: "While both Maize and Chilli have historically shown high yields for your land type, our predictive models forecast a significantly higher market price for Chilli next season.",
        sender: "CertainAg",
        delay: 5000,
      },
      {
        text: "Our recommation is Chilli 🌶",
        sender: "CertainAg",
        delay: 6000,
      },
      {
        text: "Why do your recommend chilli over maize?",
        sender: "farmer",
        delay: 7500,
      },
      {
        text: "Best alignment with your soil micro & macro levels + highest projected profit margin.",
        sender: "CertainAg",
        delay: 9000,
      },
      
      
        
       

    ],
  },
  
]

export function AITeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // Left side states
  const [leftConversationIndex, setLeftConversationIndex] = useState(0)
  const [leftMessages, setLeftMessages] = useState<any[]>([])
  const [leftTyping, setLeftTyping] = useState(false)
  const leftTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Right side states
  const [rightConversationIndex, setRightConversationIndex] = useState(0)
  const [rightMessages, setRightMessages] = useState<any[]>([])
  const [rightTyping, setRightTyping] = useState(false)
  const rightTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatContainerRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [rightMessages, rightTyping])

  useEffect(() => {
    if (chatContainerRef2.current) {
      chatContainerRef2.current.scrollTop = chatContainerRef2.current.scrollHeight
    }
  }, [leftMessages, leftTyping])

  // Left side simulation
  useEffect(() => {
    const conversation = leftConversations[leftConversationIndex]
    setLeftMessages([])
    setLeftTyping(false)

    if (leftTimeoutRef.current) clearTimeout(leftTimeoutRef.current)

    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        leftTimeoutRef.current = setTimeout(() => {
          setLeftConversationIndex((prev) => (prev + 1) % leftConversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      leftTimeoutRef.current = setTimeout(() => {
        if (message.sender === "CertainAg") {
          setLeftTyping(true)
          leftTimeoutRef.current = setTimeout(() => {
            setLeftMessages((prev) => [...prev, message])
            setLeftTyping(false)
            messageIndex++
            showNextMessage()
          }, 800)
        } else {
          setLeftMessages((prev) => [...prev, message])
          messageIndex++
          showNextMessage()
        }
      }, message.delay)
    }

    showNextMessage()
    return () => {
      if (leftTimeoutRef.current) clearTimeout(leftTimeoutRef.current)
    }
  }, [leftConversationIndex])

  // Right side simulation
  useEffect(() => {
    const conversation = rightConversations[rightConversationIndex]
    setRightMessages([])
    setRightTyping(false)

    if (rightTimeoutRef.current) clearTimeout(rightTimeoutRef.current)

    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        rightTimeoutRef.current = setTimeout(() => {
          setRightConversationIndex((prev) => (prev + 1) % rightConversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      rightTimeoutRef.current = setTimeout(() => {
        if (message.sender === "CertainAg") {
          setRightTyping(true)
          rightTimeoutRef.current = setTimeout(() => {
            setRightMessages((prev) => [...prev, message])
            setRightTyping(false)
            messageIndex++
            showNextMessage()
          }, 800)
        } else {
          setRightMessages((prev) => [...prev, message])
          messageIndex++
          showNextMessage()
        }
      }, message.delay)
    }

    showNextMessage()
    return () => {
      if (rightTimeoutRef.current) clearTimeout(rightTimeoutRef.current)
    }
  }, [rightConversationIndex])

  return (
    <section id="ai-team" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-b-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              AI Agriculture Assistant Demo
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              See AI Handle{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                Expert Farming Queries
              </span>
            </h2>

            <p
              className={`text-xl text-slate-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Watch how our AI provides crop advice, diagnoses diseases, and monitors market prices 24/7.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Left side - Phone mockup */}
            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
              <div className="max-w-md w-full">
                <div
                  className={`relative transition-all duration-1000 delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-slate-50 px-6 py-3 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="font-medium text-slate-700">Generic AI</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">24/7</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 px-6 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <img
                              src="/images/gchat.webp"
                              alt="CertainAg AI"
                              className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">Generic AI Agent</h3>
                             
                            </div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              Online
                            </div>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef2}
                          className="h-96 overflow-y-scroll scrollbar-hide p-4 space-y-3 bg-slate-50"
                          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                          {leftMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.sender === "farmer" ? "justify-end" : "justify-start"}`}
                            >
                              {message.sender === "CertainAg" && (
                                <img
                                  src="/images/gchat.webp"
                                  alt="Michael"
                                  className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                                />
                              )}
                              <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                  message.sender === "farmer"
                                    ? "bg-slate-900 text-white rounded-br-md"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-md"
                                }`}
                              >
                                {message.text.split("\n").map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                              {message.sender === "farmer" && (
                                <div className="w-6 h-6 rounded-full bg-slate-400 ml-2 mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium">
                                  F
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Typing indicator */}
                          {leftTyping && (
                            <div className="flex justify-start items-start">
                              <img
                                src="/images/gchat.webp"
                                alt="Michael"
                                className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                              />
                              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                            <span className="text-slate-500 text-sm lg:text-base flex-1">Generic AI is responding...</span>
                            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="max-w-md w-full">
                <div
                  className={`relative transition-all duration-1000 delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-slate-50 px-6 py-3 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="font-medium text-slate-700">CertainAg AI</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">24/7</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 px-6 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <img
                              src="/images/gchat.webp"
                              alt="CertainAg AI"
                              className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">CertainAg</h3>
                              
                            </div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              Online
                            </div>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef}
                          className="h-96 overflow-y-scroll scrollbar-hide p-4 space-y-3 bg-slate-50"
                          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                          {rightMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.sender === "farmer" ? "justify-end" : "justify-start"}`}
                            >
                              {message.sender === "CertainAg" && (
                                <img
                                  src="/images/gchat.webp"
                                  alt="Michael"
                                  className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                                />
                              )}
                              <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                  message.sender === "farmer"
                                    ? "bg-slate-900 text-white rounded-br-md"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-md"
                                }`}
                              >
                                {message.text.split("\n").map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                              {message.sender === "farmer" && (
                                <div className="w-6 h-6 rounded-full bg-slate-400 ml-2 mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium">
                                  F
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Typing indicator */}
                          {rightTyping && (
                            <div className="flex justify-start items-start">
                              <img
                                src="/images/gchat.webp"
                                alt="Michael"
                                className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                              />
                              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                            <span className="text-slate-500 text-sm lg:text-base flex-1">CertainAg is responding...</span>
                            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
