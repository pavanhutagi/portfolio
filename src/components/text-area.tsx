"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";

import clsx from "clsx";

export interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
}) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value === "") {
      setTouched(false);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        className={clsx(
          "rounded-[15px] p-3 sm:p-4 outline-none",
          "bg-secondary-500 dark:bg-secondary-200",
          "text-text-primaryDark dark:text-text-primary",
          "focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        )}
        rows={rows}
      />
      {required && touched && value === "" && (
        <p className={clsx("text-sm", "text-primary-500 dark:text-primary-400")}>
          {placeholder} is required
        </p>
      )}
    </div>
  );
};

export default TextArea;
