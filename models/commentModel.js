const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({

    commentOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    commentContent: {
        type: String,
        maxlength: 255,
        minlength: 3
    },

    commentImage: {
        type: String,
    },
    commentVideo: {
        type: String
    },
    commentLikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentReplies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},

    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);