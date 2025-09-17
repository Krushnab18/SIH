const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['Pothole', 'Garbage', 'Streetlight'], required: true },
    description: { type: String },
    photoUrl: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    status: { type: String, enum: ['Submitted', 'In Progress', 'Resolved'], default: 'Submitted' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Issue', issueSchema);
