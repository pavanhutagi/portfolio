"use client";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/button";
import ChatBot from "@/components/chat-bot/chat-bot";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isFormValid, setIsFormValid] = useState(false);
  const [contactFormHeight, setContactFormHeight] = useState(0);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid =
      name.trim() !== "" && email.trim() !== "" && message.trim() !== "" && emailRegex.test(email);
    setIsFormValid(valid);
  }, [name, email, message]);

  useEffect(() => {
    // Function to calculate and set the form height
    const calculateFormHeight = () => {
      if (contactFormRef.current) {
        const height = contactFormRef.current.offsetHeight;
        setContactFormHeight(height);
      }
    };

    // Create a ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateFormHeight();
    });

    // Start observing the form element
    if (contactFormRef.current) {
      resizeObserver.observe(contactFormRef.current);
    }

    // Calculate initially
    calculateFormHeight();

    // Cleanup
    return () => {
      if (contactFormRef.current) {
        resizeObserver.unobserve(contactFormRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (!isFormValid) return;

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

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center lg:flex-row gap-14 w-[90%] max-w-[1200px] relative z-10">
        <ChatBot height={contactFormHeight} />

        {/* <div className="hidden lg:block w-[2px] bg-gray-700 dark:bg-gray-300 self-stretch mx-4 opacity-80"></div>
        <div className="block lg:hidden h-[2px] w-full bg-gray-700 dark:bg-gray-300 my-4 opacity-80"></div> */}

        <div
          ref={contactFormRef}
          className="flex flex-col justify-center gap-4 w-full lg:h-[700px]"
        >
          <p className="text-text-light dark:text-text-dark text-2xl font-bold">Get in touch</p>

          <p className="text-text-light dark:text-text-dark text-lg">
            Have a question or want to work together? Fill out the form below and I'll get back to
            you as soon as possible.
          </p>

          <TextInput
            placeholder="Name"
            value={name}
            onChange={(value) => setName(value)}
            required
            type="text"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value)}
            required
            type="email"
          />

          <TextArea
            placeholder="Message"
            value={message}
            rows={10}
            onChange={(value) => setMessage(value)}
            required
          />

          <Button onClick={handleSubmit} disabled={status === "loading" || !isFormValid}>
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
