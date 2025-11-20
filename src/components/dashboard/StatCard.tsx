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
            className="relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-md bg-white/[0.03] hover:bg-white/[0.05] transition-colors group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-white/40 uppercase tracking-wider">{label}</p>
                    <h3 className="mt-2 text-3xl font-heading font-bold text-white tracking-tight">{value}</h3>
                    {trend && (
                        <p className={cn(
                            "mt-2 text-xs font-medium flex items-center gap-1",
                            trendUp ? "text-emerald-400" : "text-rose-400"
                        )}>
                            {trendUp ? "↑" : "↓"} {trend}
                        </p>
                    )}
                </div>
                <div className={cn(
                    "p-3 rounded-xl border transition-all duration-300 group-hover:scale-110",
                    colorStyles[color]
                )}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
