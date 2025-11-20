import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FunButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
}

const FunButton = forwardRef<HTMLButtonElement, FunButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground fun-glow-primary hover:brightness-110",
      secondary: "bg-secondary text-secondary-foreground fun-glow-secondary hover:brightness-110",
      accent: "bg-accent text-accent-foreground fun-glow-accent hover:brightness-110",
      success: "bg-success text-white fun-glow hover:brightness-110",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-12 py-4 text-lg",
      xl: "px-16 py-5 text-xl",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative overflow-hidden font-heading font-semibold rounded-2xl transition-all duration-300",
          "flex items-center justify-center gap-3", // Alignment fix
          "shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant as keyof typeof variants],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* Shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      </motion.button>
    );
  }
);

FunButton.displayName = "FunButton";

export default FunButton;
