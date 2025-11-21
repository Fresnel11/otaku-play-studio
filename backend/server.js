const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const adminRoutes = require('./routes/adminRoutes');
const swaggerSpec = require('./config/swagger');
const seedQuestions = require('./seeder/seedQuestions');

dotenv.config();

// Connect to MongoDB and seed initial data
connectDB().then(async () => {
    await seedQuestions();
});

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Otaku Play API Docs'
}));

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.get('/', (req, res) => {
    res.send('API is running... Visit /api-docs for documentation');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/games/speed-pulse', gameRoutes);
app.use('/api/admin/questions', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
