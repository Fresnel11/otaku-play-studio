const mongoose = require('mongoose');

const userQuestionHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    questionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Index pour optimiser les requêtes
userQuestionHistorySchema.index({ userId: 1, category: 1 });

// Méthode pour ajouter des questions à l'historique
userQuestionHistorySchema.methods.addQuestions = function(questionIds) {
    // Ajouter les nouvelles questions sans doublons
    const newQuestionIds = questionIds.filter(id => 
        !this.questionIds.some(existingId => existingId.toString() === id.toString())
    );
    
    this.questionIds.push(...newQuestionIds);
    
    // Garder seulement les 100 dernières questions pour éviter une croissance infinie
    if (this.questionIds.length > 100) {
        this.questionIds = this.questionIds.slice(-100);
    }
    
    this.lastUpdated = Date.now();
    return this.save();
};

// Méthode pour nettoyer l'historique ancien (plus de 7 jours)
userQuestionHistorySchema.methods.cleanOldHistory = function() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (this.lastUpdated < sevenDaysAgo) {
        this.questionIds = [];
        this.lastUpdated = Date.now();
        return this.save();
    }
    return Promise.resolve(this);
};

module.exports = mongoose.model('UserQuestionHistory', userQuestionHistorySchema);