"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";

import clsx from "clsx";

export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "email" | "password";
  className?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const TextInput: FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
  className,
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (value === "") {
      setTouched(false);
    }
  }, [value]);

  useEffect(() => {
    if (required && value === "") {
      setError(`${placeholder} is required`);
    } else if (type === "email" && value !== "" && !validateEmail(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  }, [value, placeholder, required, type]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => {
          setTouched(true);
        }}
        className={clsx(
          "clip-corner-sm p-3 outline-hidden sm:p-4",
          "border border-secondary-400/40 bg-secondary-800/60",
          "font-mono text-sm",
          "text-text-primaryDark",
          "placeholder:text-text-secondaryDark",
          "transition-all focus:border-primary-500 focus:bg-secondary-800",
          className
        )}
      />

      {touched && error && (
        <p className="font-mono text-xs uppercase tracking-wider text-accent-400">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
