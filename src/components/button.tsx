interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#a82121] dark:bg-[#f34848] hover:bg-[#dc3b3b] dark:hover:bg-[#c44848] text-text-dark dark:text-text-light rounded-[15px] p-4"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
