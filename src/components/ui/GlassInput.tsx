import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

export interface GlassInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, type, icon: Icon, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const isPassword = type === "password";

        return (
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/80 transition-colors duration-300 pointer-events-none">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <input
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-white/30 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all duration-300",
                        Icon && "pl-10",
                        isPassword && "pr-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors duration-300 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
                {/* Subtle glow effect on focus */}
                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500 blur-xl -z-10" />
            </div>
        );
    }
);
GlassInput.displayName = "GlassInput";

export { GlassInput };
