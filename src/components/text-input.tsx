import { ChangeEvent, FC, useEffect, useState } from "react";

export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "email" | "password";
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
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  // Reset touched state when value is cleared
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
        className="bg-secondary-500 dark:bg-secondary-200 text-text-dark dark:text-text-light rounded-[15px] p-3 sm:p-4 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />

      {touched && error && (
        <p className="text-primary-500 dark:text-primary-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
