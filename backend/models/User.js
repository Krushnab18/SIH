const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['citizen', 'official', 'admin'], required: true },
    fcmToken: { type: String },
    profilePhotoUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
