"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { FaMicrophone, FaPaperPlane, FaStop } from "react-icons/fa";

import ChatHeader from "@/components/chat-bot/chat-header";
import ChatMessages from "@/components/chat-bot/chat-messages";
import { useAppContext } from "@/context/app-context";
import { Message } from "@/types/chat-bot";

type VoiceState = "idle" | "listening" | "thinking" | "speaking";

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
    webkitAudioContext: typeof AudioContext;
  }
}

interface ChatBotProps {
  height?: number;
  className?: string;
}

export default function ChatBot({ height, className }: ChatBotProps) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Hey! I'm Pavan — well, an AI version of me. Ask me anything about my work, skills, or just say hi!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const { setIsChatBotActive } = useAppContext();

  const abortControllerRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef("");
  const voiceModeRef = useRef(false);
  const voiceStateRef = useRef<VoiceState>("idle");
  const processingRef = useRef(false);
  const ignoreResultsRef = useRef(false);
  const retryCountRef = useRef(0);
  const chatMessagesRef = useRef(chatMessages);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const MAX_RETRIES = 5;

  useEffect(() => {
    voiceModeRef.current = voiceMode;
    setIsChatBotActive(voiceMode);
  }, [voiceMode, setIsChatBotActive]);

  useEffect(() => {
    voiceStateRef.current = voiceState;
  }, [voiceState]);

  useEffect(() => {
    chatMessagesRef.current = chatMessages;
  }, [chatMessages]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, voiceState]);

  const stopAudio = useCallback(() => {
    const source = audioSourceRef.current;
    audioSourceRef.current = null;
    if (source) {
      try {
        source.stop();
      } catch {
        /* ignore */
      }
      source.disconnect();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
  }, []);

  const startListening = useCallback(() => {
    if (!voiceModeRef.current) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (processingRef.current || ignoreResultsRef.current) return;

      retryCountRef.current = 0;
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        transcriptRef.current += finalTranscript;
      }

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      if (transcriptRef.current.trim() || interimTranscript.trim()) {
        const hasFinalized = transcriptRef.current.trim().length > 0;
        const silenceMs = hasFinalized ? 800 : 1200;
        silenceTimerRef.current = setTimeout(() => {
          if (processingRef.current || ignoreResultsRef.current) return;
          const text = transcriptRef.current.trim();
          if (text && voiceModeRef.current) {
            processingRef.current = true;
            transcriptRef.current = "";
            ignoreResultsRef.current = true;
            processVoiceInput(text);
          }
        }, silenceMs);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech" || event.error === "aborted") return;

      if (event.error === "not-allowed") {
        setVoiceMode(false);
        voiceModeRef.current = false;
        setVoiceState("idle");
        recognitionRef.current = null;
        setChatMessages((prev) => [
          ...prev,
          {
            text: "Microphone access is needed for voice chat. Please allow it in your browser settings.",
            isBot: true,
            timestamp: new Date(),
          },
        ]);
        return;
      }

      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      recognitionRef.current = null;

      if (!voiceModeRef.current) return;
      if (processingRef.current || ignoreResultsRef.current) return;

      retryCountRef.current++;
      if (retryCountRef.current <= MAX_RETRIES) {
        const delay = Math.min(500 * Math.pow(2, retryCountRef.current - 1), 8000);
        setTimeout(() => startListening(), delay);
      } else {
        setVoiceMode(false);
        voiceModeRef.current = false;
        setVoiceState("idle");
        retryCountRef.current = 0;
      }
    };

    recognitionRef.current = recognition;
    ignoreResultsRef.current = false;
    transcriptRef.current = "";
    setVoiceState("listening");

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setTimeout(() => startListening(), 300);
    }
  }, []);

  const processVoiceInput = useCallback(
    async (text: string) => {
      if (!voiceModeRef.current) {
        processingRef.current = false;
        return;
      }

      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* ignore */
        }
        recognitionRef.current = null;
      }

      setVoiceState("thinking");

      const userMessage: Message = {
        text,
        isBot: false,
        timestamp: new Date(),
      };

      const updatedMessages = [...chatMessagesRef.current, userMessage];
      setChatMessages(updatedMessages);
      setIsTyping(true);

      try {
        const history = updatedMessages.slice(0, -1).map((msg) => ({
          role: msg.isBot ? "assistant" : "user",
          content: msg.text,
        }));

        const chatRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history,
            voiceMode: true,
          }),
        });

        const data = await chatRes.json();
        if (!chatRes.ok) throw new Error(data.error || "Chat API failed");

        const botResponse: Message = {
          text: data.text,
          isBot: true,
          timestamp: new Date(),
        };

        if (!voiceModeRef.current) {
          setChatMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
          processingRef.current = false;
          return;
        }

        setVoiceState("speaking");
        setIsSpeaking(true);

        const ttsRes = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: botResponse.text }),
        });

        if (!ttsRes.ok) throw new Error("TTS API failed");

        const arrayBuffer = await ttsRes.arrayBuffer();

        stopAudio();

        const audioCtx = audioContextRef.current;
        if (!audioCtx) throw new Error("AudioContext not available");

        if (audioCtx.state === "suspended") {
          await audioCtx.resume();
        }

        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        audioSourceRef.current = source;

        source.onended = () => {
          if (audioSourceRef.current !== source) return;
          audioSourceRef.current = null;
          setIsSpeaking(false);
          processingRef.current = false;
          if (voiceModeRef.current) {
            startListening();
          } else {
            setVoiceState("idle");
          }
        };

        setChatMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);

        source.start();
      } catch (error) {
        console.error("Voice conversation error:", error);
        const errorMessage: Message = {
          text: "Oops, something went wrong on my end. Try again in a bit!",
          isBot: true,
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
        setIsSpeaking(false);
        processingRef.current = false;
        if (voiceModeRef.current) {
          startListening();
        } else {
          setVoiceState("idle");
        }
      }
    },
    [startListening, stopAudio]
  );

  const stopVoiceMode = useCallback(() => {
    setVoiceMode(false);
    voiceModeRef.current = false;
    setVoiceState("idle");

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }

    stopAudio();
    transcriptRef.current = "";
    processingRef.current = false;
    ignoreResultsRef.current = false;
    retryCountRef.current = 0;
    setIsSpeaking(false);
    setIsTyping(false);
  }, [stopAudio]);

  const toggleVoiceMode = useCallback(async () => {
    if (voiceMode) {
      stopVoiceMode();
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "Voice chat isn't supported in this browser. Please try Chrome or Edge for voice features.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    setVoiceMode(true);
    voiceModeRef.current = true;
    retryCountRef.current = 0;
    startListening();
  }, [voiceMode, startListening, stopVoiceMode]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* ignore */
        }
      }
      stopAudio();
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopAudio]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      text,
      isBot: false,
      timestamp: new Date(),
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    abortControllerRef.current = new AbortController();

    try {
      const history = updatedMessages.slice(0, -1).map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const botResponse: Message = {
        text: data.text,
        isBot: true,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;

      const errorMessage: Message = {
        text: "Oops, something went wrong on my end. Try again in a bit!",
        isBot: true,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim() || isTyping) return;

    const currentInput = chatInput;
    setChatInput("");
    await sendMessage(currentInput);
  };

  const voiceButtonLabel = (() => {
    if (!voiceMode) return "Start voice chat";
    switch (voiceState) {
      case "listening":
        return "Listening...";
      case "thinking":
        return "Thinking...";
      case "speaking":
        return "Speaking...";
      default:
        return "Stop voice chat";
    }
  })();

  return (
    <div
      className={clsx(
        "flex flex-col",
        "w-full",
        className || `h-[85vh] lg:h-[${height}px]`,
        "border border-primary-500/40 bg-secondary-900/95",
        "clip-corner",
        "overflow-hidden",
        "relative",
        "backdrop-blur-md glow-cyan"
      )}
    >
      <ChatHeader />

      <div id="chat-messages" className={clsx("grow", "bg-transparent", "overflow-y-auto")}>
        <ChatMessages
          messages={chatMessages}
          isTyping={isTyping}
          voiceState={voiceMode ? voiceState : "idle"}
        />
      </div>

      <div className={clsx("border-t border-primary-500/30 bg-secondary-800/90", "p-3")}>
        <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={voiceMode ? "Voice mode active — speak!" : "> type your message..."}
            disabled={voiceMode}
            className={clsx(
              "grow",
              "px-3 py-2",
              "border border-secondary-400/40 bg-secondary-900/80",
              "font-mono text-sm",
              "text-text-primaryDark",
              "placeholder:text-text-secondaryDark",
              "clip-corner-sm",
              "focus:border-primary-500 focus:outline-hidden",
              voiceMode && "opacity-50"
            )}
          />
          {chatInput.trim() && !voiceMode ? (
            <button
              type="submit"
              disabled={isTyping}
              aria-label="Send message"
              title="Send message"
              className={clsx(
                "clip-corner-sm",
                "p-3",
                "transition-all duration-300",
                "shrink-0 border",
                isTyping
                  ? "cursor-not-allowed border-secondary-400/40 bg-secondary-800 text-text-disabledDark"
                  : "border-primary-500/60 bg-primary-500/15 text-primary-300 hover:bg-primary-500/30 hover:glow-cyan"
              )}
            >
              <FaPaperPlane />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleVoiceMode}
              disabled={isTyping && !voiceMode}
              aria-label={voiceButtonLabel}
              title={voiceButtonLabel}
              className={clsx(
                "clip-corner-sm",
                "p-3",
                "transition-all duration-300",
                "relative",
                "shrink-0 border",
                voiceMode
                  ? "border-accent-500 bg-accent-500/20 text-accent-300 hover:glow-magenta"
                  : isTyping
                    ? "cursor-not-allowed border-secondary-400/40 bg-secondary-800 text-text-disabledDark"
                    : "border-accent-500/60 bg-accent-500/15 text-accent-300 hover:bg-accent-500/30 hover:glow-magenta"
              )}
            >
              {voiceMode ? <FaStop /> : <FaMicrophone />}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
