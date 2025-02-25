interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-secondary-500 dark:bg-secondary-200 text-text-dark dark:text-text-light rounded-[15px] p-3 sm:p-4 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
  );
}
