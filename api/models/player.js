const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { 
        type: Number,
        min: 1,
        index: true,
        unique: true,
        required: true
    },
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    played: {
        type: Number,
        default: 0,
        min:0
    },
    minutes: {
        type: Number,
        default: 0,
        min: 0
    },
    goals: {
        type: Number,
        default: 0,
        min:0
    },
    assists: {
        type: Number, 
        default: 0,
        min: 0
    },
    yellowCards: {
        type: Number,
        default: 0,
        min:0
    },
    redCards: {
        type: Number,
        default: 0,
        min: 0
    }
});

module.exports = mongoose.model('Player', playerSchema);