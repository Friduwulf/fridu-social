const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

//Schema for what makes up a thought
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
            trim: true,
        },
        createdAt: {
            date: {
                type: Date,
                default: Date.now,
            }
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
                getters: true
            },
            id: false
    }
);

//Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;