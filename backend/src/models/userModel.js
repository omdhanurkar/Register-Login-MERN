const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },

    email: { type: String },

    phone: { type: Number },

    password: { type: String },
    confirmPassword: { type: String }


}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);