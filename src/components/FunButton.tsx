import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FunButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "success";
  size?: "sm" | "md" | "lg";
}

const FunButton = forwardRef<HTMLButtonElement, FunButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground fun-glow-primary hover:brightness-110",
      secondary: "bg-secondary text-secondary-foreground fun-glow-secondary hover:brightness-110",
      accent: "bg-accent text-accent-foreground fun-glow-accent hover:brightness-110",
      success: "bg-success text-white fun-glow hover:brightness-110",
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-12 py-4 text-lg",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.07, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "font-heading font-semibold rounded-2xl transition-all duration-200",
          "shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

FunButton.displayName = "FunButton";

export default FunButton;
