const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");
// NOT A MODEL ONLY A SCHEMA
//validate Text Length
const valTxtLength = function (text) {
  const len = text.length;
  if (len >= 1 && len <= 280) {
    return true;
  } else {
    return false;
  }
};


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: [valTxtLength, "Text invalid"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create a Virtual called reactionCount that retrives the length of the thought's reactions
thoughtSchema.virtual("reactionCount").get( function() {
  return this.reactions.length;
});

// create the Thought  model using the Thought Schema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
