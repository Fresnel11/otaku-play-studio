import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AvatarSelectorModal } from "./AvatarSelectorModal";

interface AvatarGeneratorProps {
    onSave: (url: string) => void;
    currentAvatar: string;
}

export const AvatarGenerator = ({ onSave, currentAvatar }: AvatarGeneratorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border-4 border-[#0a0a0a] group"
            >
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </button>

            <AvatarSelectorModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSelectAvatar={onSave}
                currentAvatar={currentAvatar}
            />
        </>
    );
};
