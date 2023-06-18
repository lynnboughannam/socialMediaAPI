const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Please enter your fullname'],
        minlength: 5,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter your useername'],
        minlength: 5,
        maxlength: 12,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        minlength: 5,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 8,
        trim: true,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User' //referencing the user

        }
    ],

    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'

        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'

        }
    ]

},

    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);