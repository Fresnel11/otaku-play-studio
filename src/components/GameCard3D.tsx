import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import FunButton from "./FunButton";

interface GameCard3DProps {
    title: string;
    description: string;
    image: string;
    icon: LucideIcon;
    action: () => void;
    available: boolean;
    color: string;
}

const GameCard3D = ({ title, description, image, icon: Icon, action, available, color }: GameCard3DProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[500px] w-full rounded-3xl cursor-pointer perspective-1000"
            onClick={available ? action : undefined}
        >
            {/* Card Content */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 bg-black">
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            scale: 1.2,
                            translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]),
                            translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-10%", "10%"]),
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 transform translate-z-20">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="transform translate-z-30"
                    >
                        {/* Icon Badge */}
                        <div className={`inline-flex p-3 rounded-2xl bg-${color}/20 backdrop-blur-md border border-${color}/30 mb-4`}>
                            <Icon className={`w-8 h-8 text-${color}`} />
                        </div>

                        <h3 className="text-4xl font-heading font-bold text-white mb-2 drop-shadow-lg transform translate-z-40">
                            {title}
                        </h3>

                        <p className="text-white/80 text-lg mb-6 line-clamp-2 transform translate-z-30">
                            {description}
                        </p>

                        {available ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FunButton variant="glass" className="w-full bg-white/20 hover:bg-white/30 border-white/40">
                                    Jouer maintenant
                                </FunButton>
                            </motion.div>
                        ) : (
                            <div className="inline-block px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 text-sm font-semibold">
                                Bientôt disponible
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform translate-z-50" />
                </div>
            </div>
        </motion.div>
    );
};

export default GameCard3D;
