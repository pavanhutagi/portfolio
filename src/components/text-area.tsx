interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}

export default function TextArea({
  placeholder,
  value,
  onChange,
  rows,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background-dark dark:bg-background-light rounded-[15px] p-4 max-h-[500px] min-h-[100px] outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      rows={rows}
    />
  );
}
