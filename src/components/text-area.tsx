import { ChangeEvent, FC, useEffect, useState } from "react";

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

  // Reset touched state when value is cleared
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
        className="bg-secondary-500 dark:bg-secondary-200 text-text-dark dark:text-text-light rounded-[15px] p-3 sm:p-4 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        rows={rows}
      />
      {required && touched && value === "" && (
        <p className="text-red-500 text-sm">{placeholder} is required</p>
      )}
    </div>
  );
};

export default TextArea;
