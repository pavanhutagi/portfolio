interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light rounded-[15px] p-4"
    >
      {children}
    </button>
  );
}
