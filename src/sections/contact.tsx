import { useEffect, useState } from "react";

import { FaCode, FaCommentDots, FaEnvelope, FaMobile, FaPaperPlane } from "react-icons/fa";
import { MdDesignServices, MdPalette, MdSettings } from "react-icons/md";

import Button from "@/components/button";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

type Message = {
  text: string;
  isBot: boolean;
  timestamp: Date;
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Chatbot states
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: chatInput,
      isBot: false,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(chatInput),
        isBot: true,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Simple bot response logic
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello! How can I assist you today?";
    } else if (lowerInput.includes("help")) {
      return "I can help answer questions about our services, pricing, or you can use the form on the right to send a direct message.";
    } else if (
      lowerInput.includes("contact") ||
      lowerInput.includes("email") ||
      lowerInput.includes("phone")
    ) {
      return "You can contact us using the form on the right, or email us directly at contact@example.com";
    } else if (lowerInput.includes("service") || lowerInput.includes("product")) {
      return "We offer a range of services including web development, design, and consulting. Is there a specific service you're interested in?";
    } else if (
      lowerInput.includes("price") ||
      lowerInput.includes("cost") ||
      lowerInput.includes("quote")
    ) {
      return "Pricing depends on your specific needs. Please fill out the contact form with details about your project for a custom quote.";
    } else if (lowerInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (lowerInput.includes("bye")) {
      return "Goodbye! Feel free to reach out if you have more questions.";
    } else {
      return "I'm not sure I understand. Could you rephrase that or ask something else?";
    }
  };

  const handleSubmit = async () => {
    try {
      setStatus("loading");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      // Reset success status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      // Reset error status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-10 w-[90%] max-w-[1200px] relative z-10">
        <div className="bg-[#1E1E1E] rounded-[15px] w-full h-[600px] lg:h-auto flex flex-col overflow-hidden relative backdrop-blur-sm">
          {/* Chatbot header */}
          <div className="bg-[#4b279e] p-4 flex items-center">
            <div className="bg-[#7C4DFF] p-2 rounded-full mr-3">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                  <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3">
                  <div className="w-full h-full border-2 border-t-0 border-white rounded-b-full"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Virtual Assistant</h3>
              <p className="text-sm text-white text-opacity-80">
                Ask me anything about our services
              </p>
            </div>
          </div>

          {/* Chat area with blue border */}
          <div className="flex-grow bg-[#1E1E1E]">
            {/* Chat messages */}
            <div
              id="chat-messages"
              className="flex-grow overflow-y-auto py-4 px-4 space-y-4 h-[460px] custom-scrollbar"
            >
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.isBot ? "bg-[#374151] text-white" : "bg-[#674b91] text-white"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#374151] text-white rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat input */}
          <div className="bg-[#6B7280] p-2 rounded-t-2xl">
            <form onSubmit={handleChatSubmit} className="flex items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message here"
                className="flex-grow px-2 bg-[#6B7280] text-white placeholder-gray-300 rounded-lg focus:outline-none pb-1"
              />
              <button
                type="submit"
                className="bg-[#1a1a1a] text-white rounded-full hover:bg-red-600 transition-colors p-3 shadow-l cursor-pointer"
                disabled={!chatInput.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <TextInput placeholder="Name" value={name} onChange={(value) => setName(value)} />

          <TextInput placeholder="Email" value={email} onChange={(value) => setEmail(value)} />

          <TextArea
            placeholder="Message"
            value={message}
            rows={15}
            onChange={(value) => setMessage(value)}
          />

          <Button onClick={handleSubmit} disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send"}
          </Button>

          {status === "success" && (
            <p className="text-green-500 text-center">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}
