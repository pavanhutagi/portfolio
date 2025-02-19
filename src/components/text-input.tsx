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
      className="bg-background-dark dark:bg-background-light rounded-[15px] p-4 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
  );
}
