const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { 
        type: Number,
        min: 1,
        index: true,
        unique: true,
        required: true
    },
    teamName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    group: {
        type: String,
        required: true,
        match:/[a-hA-H]/,
        uppercase: true
        
    },
    played: {
        type: Number,
        default:0,
        min:0
    },
    wins: {
        type: Number,
        default:0,
        min:0
    },
    draws: {
        type: Number,
        default:0,
        min:0
    },
    loses: {
        type: Number,
        default:0,
        min:0
    },
    points: {
        type: Number,
        default:0,
        min:0
    },
    goalsFor: {
        type: Number,
        default:0,
        min:0
    },
    goalsAgainst: {
        type: Number,
        default:0,
        min:0
    },
    goalsDiff: {
        type: Number,
        default:0
    },
    teamFlag: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Team', teamSchema);