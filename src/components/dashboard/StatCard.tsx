import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "indigo" | "purple" | "pink" | "blue";
    delay?: number;
}

const StatCard = ({
    label,
    value,
    icon: Icon,
    trend,
    trendUp = true,
    color = "indigo",
    delay = 0
}: StatCardProps) => {
    const colorStyles = {
        indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6 backdrop-blur-md bg-white/[0.03] hover:bg-white/[0.05] transition-colors group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-white/40 uppercase tracking-wider truncate">{label}</p>
                    <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white tracking-tight">{value}</h3>
                    {trend && (
                        <p className={cn(
                            "mt-1 sm:mt-2 text-xs font-medium flex items-center gap-1 truncate",
                            trendUp ? "text-emerald-400" : "text-rose-400"
                        )}>
                            {trendUp ? "↑" : "↓"} {trend}
                        </p>
                    )}
                </div>
                <div className={cn(
                    "p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 group-hover:scale-110 flex-shrink-0",
                    colorStyles[color]
                )}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
