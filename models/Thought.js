const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//validate Text Length
const valTxtLength = function(text) {
    const len = text.length
    if(len >= 1 && len <= 280 ) {
        return true;
    } else {
        return false;
    }
}

const thoughtSchema = new Schema({
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
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)     
    }
    // ,
    // {toJSON:{getters:true}, id:false}

});

// create a Virtual called reactionCount that retrives teh length of the thought's reactions
thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length
})

// create the Thought  model using the Thought Schema
const Thought  = model('Thought', thoughtSchema);


module.exports = {Thought}