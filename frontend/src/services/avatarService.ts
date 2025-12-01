import axios from 'axios';

/**
 * Simple avatar generation using DiceBear API
 * Free, fast, and no authentication required
 */

export interface AvatarStyle {
    name: string;
    label: string;
    description: string;
}

// Available avatar styles
export const AVATAR_STYLES: AvatarStyle[] = [
    { name: 'avataaars', label: 'Avataaars', description: 'Cartoon style avatars' },
    { name: 'bottts', label: 'Bottts', description: 'Robot avatars' },
    { name: 'adventurer', label: 'Adventurer', description: 'Adventurer style' },
    { name: 'big-smile', label: 'Big Smile', description: 'Happy faces' },
    { name: 'pixel-art', label: 'Pixel Art', description: '8-bit style' },
];

/**
 * Generate an avatar URL using DiceBear API
 * @param seed - Unique identifier for the avatar (username, email, or random string)
 * @param style - Avatar style (default: 'avataaars')
 * @param options - Additional options (size, background, etc.)
 */
export const generateAvatarUrl = (
    seed: string,
    style: string = 'avataaars',
    options: {
        size?: number;
        backgroundColor?: string;
        radius?: number;
    } = {}
): string => {
    const { size = 200, backgroundColor, radius = 50 } = options;

    const params = new URLSearchParams({
        seed,
        size: size.toString(),
        radius: radius.toString(),
    });

    if (backgroundColor) {
        params.append('backgroundColor', backgroundColor);
    }

    return `https://api.dicebear.com/7.x/${style}/svg?${params.toString()}`;
};

/**
 * Generate a random avatar
 */
export const generateRandomAvatar = (style: string = 'avataaars'): string => {
    const randomSeed = Math.random().toString(36).substring(7);
    return generateAvatarUrl(randomSeed, style);
};

/**
 * Download avatar as base64 (for saving to backend)
 */
export const downloadAvatarAsBase64 = async (url: string): Promise<string> => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Get predefined avatar collection
 */
export const getPredefinedAvatars = (count: number = 5, style: string = 'avataaars'): string[] => {
    const seeds = ['Felix', 'Aneka', 'Luna', 'Kai', 'Sakura', 'Milo', 'Zoe', 'Max', 'Bella', 'Leo'];
    return seeds.slice(0, count).map(seed => generateAvatarUrl(seed, style));
};
