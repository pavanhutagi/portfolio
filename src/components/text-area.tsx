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
          "clip-corner-sm resize-none p-3 outline-hidden sm:p-4",
          "border border-secondary-400/40 bg-secondary-800/60",
          "font-mono text-sm",
          "text-text-primaryDark",
          "placeholder:text-text-secondaryDark",
          "transition-all focus:border-primary-500 focus:bg-secondary-800"
        )}
        rows={rows}
      />
      {required && touched && value === "" && (
        <p className="font-mono text-xs uppercase tracking-wider text-accent-400">
          {placeholder} is required
        </p>
      )}
    </div>
  );
};

export default TextArea;
