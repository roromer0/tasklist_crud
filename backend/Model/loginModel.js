const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerAt: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    lastLogin: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Login", loginSchema);