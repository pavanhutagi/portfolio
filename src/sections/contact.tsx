import { useState } from "react";

import Button from "@/components/button";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      className="flex min-h-screen items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row gap-10 w-[90%] max-w-[1200px]">
        <div className="bg-background-dark dark:bg-background-light rounded-[15px] w-full h-[500px] lg:h-auto"></div>

        <div className="flex flex-col gap-4 w-full">
          <TextInput
            placeholder="Name"
            value={name}
            onChange={(value) => setName(value)}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />

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
            <p className="text-green-500">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-500">
              Failed to send message. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
