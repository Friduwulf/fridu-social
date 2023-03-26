const { Schema, Types } = require('mongoose');

//Schema for what makes a reaction
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => dateFormat(time),
        },
    },
    {
        toJSON: {
            getters: true, 
            virtuals: true,
          },
          id: false,
    }
);

function dateFormat(time) {
    return new Date(time).toLocaleDateString();
};

module.exports = reactionSchema;