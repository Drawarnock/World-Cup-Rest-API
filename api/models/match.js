const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { 
        type: Number,
        min: 0,
        index: true,
        unique: true,
        required: true
    },
    location: {
        type:String,
        required: true,
        trim: true
    },
    stadium: {
        type:String,
        required: true,
        trim: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    stage: {
        type: String,
        required: true
    },
    homeTeam: {
        type: {
            teamName: {
                type: String,
                required: true
            },
            group: {
                type: String,
                required: true,
                match:/[a-hA-H]/,
                uppercase: true
            }
        }
    },
    awayTeam: {
        type: {
            teamName: {
                type: String,
                required: true
            },
            group: {
                type: String,
                required: true,
                match:/[a-hA-H]/,
                uppercase: true
            }
        }
    }
});


module.exports = mongoose.model('Match', matchSchema);