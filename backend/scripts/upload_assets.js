const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_DIR = path.join(__dirname, '../../frontend/src/assets');
const PUBLIC_DIR = path.join(__dirname, '../../frontend/public');
const OUTPUT_FILE = path.join(__dirname, '../../frontend/src/constants/assetMapping.json');

// Helper to get all files recursively
const getFiles = (dir) => {
    try {
        const subdirs = fs.readdirSync(dir);
        const files = subdirs.map((subdir) => {
            const res = path.resolve(dir, subdir);
            return (fs.statSync(res).isDirectory()) ? getFiles(res) : res;
        });
        return files.reduce((a, f) => a.concat(f), []);
    } catch (e) {
        return [];
    }
};

const uploadAssets = async () => {
    try {
        console.log('🔍 Scanning directories...');

        const dirsToScan = [
            { path: ASSETS_DIR, name: 'src/assets' },
            { path: PUBLIC_DIR, name: 'public' }
        ];

        const mapping = {};

        for (const dirInfo of dirsToScan) {
            if (!fs.existsSync(dirInfo.path)) {
                console.warn(`⚠️ Directory not found: ${dirInfo.path}`);
                continue;
            }

            console.log(`\n📂 Processing ${dirInfo.name}...`);
            const files = getFiles(dirInfo.path);
            console.log(`Found ${files.length} files.`);

            for (const file of files) {
                const relativePath = path.relative(dirInfo.path, file).replace(/\\/g, '/');
                const fileName = path.basename(file);

                // Skip non-media files and system files
                if (fileName.startsWith('.') || fileName === 'vite.svg') continue;

                // Filter by extension to avoid uploading code files
                const ext = path.extname(file).toLowerCase();
                if (!['.png', '.jpg', '.jpeg', '.gif', '.svg', '.mp4', '.webm', '.mov', '.mp3', '.wav'].includes(ext)) {
                    continue;
                }

                console.log(`📤 Uploading ${relativePath}...`);

                const resourceType = ['.mp4', '.webm', '.mov', '.mp3', '.wav'].includes(ext) ? 'video' : 'image';

                try {
                    const result = await cloudinary.uploader.upload(file, {
                        folder: `otaku-play-studio/${dirInfo.name}`,
                        use_filename: true,
                        unique_filename: false,
                        resource_type: resourceType,
                        overwrite: true
                    });

                    // Key in mapping will be "filename.ext" to make it easy to find
                    // Or "subfolder/filename.ext" if it's nested
                    // We'll use the relative path as key for now, maybe prefix with source
                    const key = `${dirInfo.name}/${relativePath}`;
                    mapping[key] = result.secure_url;

                    // Also add a simple key for just the filename if it's unique (optional, but risky)
                    // Let's stick to the relative path or just filename if we want to replace imports easily
                    // For replacing imports like '@/assets/images/naruto.png', we want to map 'images/naruto.png' -> URL

                    // If it's in src/assets, we map the relative path from src/assets
                    if (dirInfo.name === 'src/assets') {
                        mapping[relativePath] = result.secure_url;
                    } else {
                        mapping[`public/${relativePath}`] = result.secure_url;
                    }

                    console.log(`✅ Uploaded: ${result.secure_url}`);
                } catch (err) {
                    console.error(`❌ Failed to upload ${relativePath}:`, err.message);
                }
            }
        }

        // Ensure directory exists
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
        console.log(`\n🎉 Migration complete! Mapping saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Fatal error:', error);
    }
};

uploadAssets();
