const Post = require("../models/postModel");
const User = require("../models/userModel");

//Todo:Create new post
exports.createPost = async (req, res) => {

    try {
        //check if the post owner exist

        const postOwner = await User.findById(req.body.postOwner);
        if (!postOwner) {
            return res.status(400).json({ messgae: "User doesn't exist for the post" });
        }
        const newPost = await Post.create({
            postOwner: req.body.postOwner,
            content: req.body.content,
            //likes and comments will be added automatically since they're ref
        });
        res.status(201).json({ message: "Post added successfullt", data: newPost });


    } catch (error) {
        console.log(error);
    }



};
exports.likeUnlike = async (req, res) => {
    try {
        //1.check if the post if it's still available
        //2.check is th epost is already  liked by the user
        //2.1 if yes, remove the like
        //2.2 if no, add the user to the list of likers

        const post = await Post.findById(req.params.postID);

        if (!post) {
            return res.status(404).json({ message: "Post is not available" });
        }

        if (!post.likes.includes(req.body.userID)) {
            //add the user to the list of likers
            await post.updateOne({ $push: { likes: req.body.userID } });
            //send to the user
            res.status(200).json({ message: "The post has been liked" });

        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userID } });
            res.status(200).json({ messgae: "The posy has been unliked" });

        }
    } catch (error) {
        console.log(error);
    }
}