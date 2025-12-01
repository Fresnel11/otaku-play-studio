import { HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FunCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "secondary" | "accent" | "soft";
}

const FunCard = forwardRef<HTMLDivElement, FunCardProps>(
  ({ className, glow = "soft", children, ...props }, ref) => {
    const glowVariants = {
      primary: "fun-glow-primary",
      secondary: "fun-glow-secondary",
      accent: "fun-glow-accent",
      soft: "fun-glow",
    };

    return (
      <motion.div
        whileHover={{ scale: 1.03, rotate: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "bg-card text-card-foreground rounded-2xl p-6",
          "border border-border/50 backdrop-blur-sm",
          glowVariants[glow],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

FunCard.displayName = "FunCard";

export default FunCard;
