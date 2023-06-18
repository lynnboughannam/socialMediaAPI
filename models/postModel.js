const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({

    //a post has an owner

    postOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    img: {
        type: String,
        default: ""
    },

    video: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: "",
        minlength: 5,
        maxlength: 500,
        trim: true,
    },
    likes: [//array of users
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            //the comment isnt like a like
            //it can have a text, image,emoji, then the reference will has its own modle

        }
    ]

},
    {
        timestamps: true
    });

module.exports = mongoose.model("Post", postSchema);