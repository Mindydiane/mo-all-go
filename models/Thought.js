const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
//validate Text Length
const valTxtLength = function(text) {
    const len = text.length
    if(len >= 1 && len <= 280 ) {
        return true;
    } else {
        return false;
    }
}

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [
            valTxtLength, 'Text invalid'
        ] ,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
        
    },
    userName: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]
    
})

// create the Thought  model using the Thought Schema
const Thought  = model('Thought', ThoughtSchema);
module.exports = Thought;