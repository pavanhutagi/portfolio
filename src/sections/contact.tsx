import { useState } from "react";

import Button from "@/components/button";
import TextArea from "@/components/text-area";
import TextInput from "@/components/text-input";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

          <Button>Send</Button>
        </div>
      </div>
    </section>
  );
}
