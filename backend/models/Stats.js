const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    newIssuesCount: { type: Number, default: 0 },
    totalIssuesCount: { type: Number, default: 0 },
    resolvedIssuesCount: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stats', statsSchema);
