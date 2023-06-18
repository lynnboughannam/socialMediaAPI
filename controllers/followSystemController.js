const User = require("../models/userModel");

exports.follow_Unfollow = async (req, res) => {

    try {
        //1.check if the user to be followed is different than the current user
        //2.check if both the current user ,and the user to be followed to already exist
        //3.check if the current user is not following the second one already(if it is ->then pull it (unfollow))

        if (req.params.id !== req.body.currentUserId) {
            try {
                //checking if both accounts exist
                const currentUser = await User.findById(req.body.currentUserId);
                if (!currentUser) {
                    return res.status(400).json({ message: "Please login before you start this request" });

                }

                const userToBeFolowed = await User.findById(req.params.id);
                if (!userToBeFolowed) {
                    return res.status(404).json({ message: "User to be followed is not found" })
                }

                if (!userToBeFolowed.followers.includes(req.body.currentUserId)) {
                    await userToBeFolowed.updateOne({ $push: { followers: req.body.currentUserId } });

                    await currentUser.updateOne({ $push: { following: req.params.id } });

                    res.status(200).json({ message: "You are now following:" + req.params.id })
                }
                else {
                    await userToBeFolowed.updateOne({ $pull: { followers: req.body.currentUserId } });

                    await currentUser.updateOne({ $pull: { following: req.params.id } });

                    res.status(200).json({ message: "You unfollowed:" + req.params.id });

                }
            } catch (error) {
                console.log(error);
            }
        }


        else {
            return res.status(409).json({ message: "You cannot follow/unfollow yourself" });
        }

    } catch (error) {
        console.log(error)
    }

}