import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  children?: ReactNode;
};

export default function Button({
  text,
  onClick,
  size = "md",
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
  children,
}: ButtonProps) {
  // Base styles that all buttons share
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#104152] text-white hover:bg-[#0d3542] focus:ring-[#104152] active:bg-[#0a2833]";

  // Size styles (responsive: smaller on mobile, larger on desktop)
  const sizeStyles = {
    sm: "px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm",
    md: "px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base",
    lg: "px-4 py-2 text-base md:px-6 md:py-3 md:text-lg",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const combinedStyles =
    `${baseStyles} ${sizeStyles[size]} ${widthStyles} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      aria-disabled={disabled}
    >
      {children || text}
    </button>
  );
}
