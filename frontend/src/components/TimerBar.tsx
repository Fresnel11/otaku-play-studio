import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerBarProps {
  duration: number;
  onComplete?: () => void;
  className?: string;
}

const TimerBar = ({ duration, onComplete, className }: TimerBarProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setIsWarning(false);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    if (timeLeft <= duration * 0.2) {
      setIsWarning(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, duration, onComplete]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={cn("relative w-full h-8 bg-muted rounded-full overflow-hidden", className)}>
      <AnimatePresence>
        <motion.div
          className={cn(
            "h-full rounded-full transition-colors duration-300",
            isWarning
              ? "bg-gradient-to-r from-destructive to-warning animate-pulse-glow"
              : "bg-gradient-to-r from-primary via-secondary to-accent"
          )}
          initial={{ width: "100%" }}
          animate={{
            width: `${percentage}%`,
            scale: isWarning ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading font-bold text-sm text-foreground drop-shadow-lg">
          {Math.ceil(timeLeft)}s
        </span>
      </div>
    </div>
  );
};

export default TimerBar;
