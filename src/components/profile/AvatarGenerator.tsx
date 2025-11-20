import { useState } from "react";
import { Sparkles, Wand2, Image as ImageIcon, Save, Loader2, Palette, Box, Grid, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GlassButton } from "@/components/ui/GlassButton";
import { enhancePromptWithGemini, generateAvatarUrl } from "@/services/gemini";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AvatarGeneratorProps {
    onSave: (url: string) => void;
    currentAvatar: string;
}

const STYLES = [
    { id: "anime", label: "Anime 2D", icon: Palette },
    { id: "3d", label: "3D Kawaii", icon: Box },
    { id: "pixel", label: "Pixel Art", icon: Grid },
    { id: "realistic", label: "Réaliste", icon: Camera },
];

export const AvatarGenerator = ({ onSave, currentAvatar }: AvatarGeneratorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("anime");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [enhancedPrompt, setEnhancedPrompt] = useState("");

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Veuillez décrire votre avatar !");
            return;
        }

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            toast.error("Configuration manquante : Clé API Gemini introuvable.");
            console.error("Veuillez définir VITE_GEMINI_API_KEY dans votre fichier .env");
            return;
        }

        setIsGenerating(true);
        setGeneratedImage(null);

        try {
            // 1. Enhance prompt with Gemini
            const enhanced = await enhancePromptWithGemini(prompt, selectedStyle, apiKey);
            setEnhancedPrompt(enhanced);

            // 2. Generate image URL
            const imageUrl = generateAvatarUrl(enhanced);

            setGeneratedImage(imageUrl);
            toast.success("Avatar généré avec succès !");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la génération.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (generatedImage) {
            onSave(generatedImage);
            setIsOpen(false);
            toast.success("Nouvel avatar appliqué !");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors border-4 border-[#0a0a0a] group">
                    <Sparkles className="h-4 w-4 group-hover:animate-spin" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <Wand2 className="h-5 w-5 text-indigo-400" />
                        Générateur d'Avatar IA
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Preview Area */}
                    <div className="flex justify-center">
                        <div className="relative w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden bg-black/50 group">
                            {generatedImage ? (
                                <img
                                    src={generatedImage}
                                    alt="Generated"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <ImageIcon className="h-12 w-12" />
                                </div>
                            )}
                            {isGenerating && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                    <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Style Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={cn(
                                        "flex items-center gap-2 p-3 rounded-xl border text-sm transition-all",
                                        selectedStyle === style.id
                                            ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                    )}
                                >
                                    <style.icon className="h-4 w-4" />
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Prompt Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Description</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ex: Un chat ninja cybernétique avec un katana..."
                            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Enhanced Prompt Display (Optional, for transparency) */}
                    {enhancedPrompt && (
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 italic">
                            ✨ Prompt optimisé : "{enhancedPrompt}"
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <GlassButton
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Génération...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Générer
                                </>
                            )}
                        </GlassButton>

                        {generatedImage && (
                            <GlassButton
                                onClick={handleSave}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white border-none"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Appliquer
                            </GlassButton>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
