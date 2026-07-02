"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";

import Button from "@/components/button";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid =
      name.trim() !== "" && email.trim() !== "" && message.trim() !== "" && emailRegex.test(email);
    setIsFormValid(valid);
  }, [name, email, message]);

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
      className={clsx(
        "relative flex min-h-screen items-center justify-center overflow-hidden py-24 px-6"
      )}
    >
      <div className="w-full max-w-[720px]">
        {/* Section label */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent-400">
            [ 02 ] // Transmit
          </span>
          <span className="h-px flex-1 bg-linear-to-r from-accent-500/60 to-transparent" />
        </div>

        <div
          className={clsx(
            "relative overflow-hidden clip-corner",
            "border border-secondary-400/40 bg-secondary-900/70 p-6 backdrop-blur-md sm:p-10"
          )}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-text-primaryDark sm:text-3xl">
                Open a <span className="neon-cyan">Channel</span>
              </h2>
              <p className="text-sm text-text-secondaryDark sm:text-base">
                Got a project, an idea, or just want to connect? Drop a message and I'll respond as
                soon as the signal reaches me.
              </p>
            </div>

            <div className="flex flex-col gap-4">
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
                rows={6}
                onChange={(value) => setMessage(value)}
                required
              />

              <Button onClick={handleSubmit} disabled={status === "loading" || !isFormValid}>
                {status === "loading" ? "Transmitting..." : "Send Transmission"}
              </Button>

              {status === "success" && (
                <p className="text-center font-mono text-sm uppercase tracking-widest text-success-400">
                  ✓ Message transmitted successfully
                </p>
              )}
              {status === "error" && (
                <p className="text-center font-mono text-sm uppercase tracking-widest text-error-400">
                  ✕ Transmission failed — retry
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
