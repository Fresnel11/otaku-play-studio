# Configuration des Environnements

## Variables d'Environnement

Le projet utilise différentes configurations selon l'environnement :

### Fichiers d'environnement

- `.env` - Configuration par défaut (développement local)
- `.env.development` - Configuration pour le développement
- `.env.production` - Configuration pour la production

### Variables disponibles

- `VITE_API_URL` - URL de l'API backend
- `VITE_GEMINI_API_KEY` - Clé API pour Gemini AI

## Utilisation

### Développement Local

```bash
npm run dev
```

Utilise automatiquement `.env.development` qui pointe vers `http://localhost:5000`

### Build de Production

```bash
npm run build
```

Utilise automatiquement `.env.production` qui pointe vers `https://otaku-play-studio.onrender.com`

### Build de Développement

```bash
npm run build:dev
```

Crée un build avec les variables de développement

## Configuration de l'API

Toutes les URLs d'API sont centralisées dans `src/config/api.ts`.

Pour changer l'URL de l'API, modifie simplement la variable `VITE_API_URL` dans le fichier `.env` approprié.

### Exemple

```env
# .env.development
VITE_API_URL=http://localhost:5000

# .env.production
VITE_API_URL=https://otaku-play-studio.onrender.com
```

## Services

Les services suivants utilisent la configuration centralisée :

- `userService.ts` - Authentification et profil utilisateur
- `gameService.ts` - Gestion des jeux et sessions
- `gameCategoryService.ts` - Catégories de jeux
- `Login.tsx` - Page de connexion
- `Register.tsx` - Page d'inscription

Tous pointent automatiquement vers la bonne URL selon l'environnement.
