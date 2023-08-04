import User from "../Models/Users.js";
import Post from "../Models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const userInfo = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      location: userInfo.location,
      description,
      userPicturePath: userInfo.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    res.status(201).json("success");
  } catch (error) {
    res.status(409).json({
      status: "failure",
      message: error.message,
    });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({ userId: id });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      status: "failure",
      message: error.message,
    });
  }
};

// UPDATE POST
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    // It will going to search for a userId, if it is liked by that user or not
    const isLiked = post.likes.get(userId);

    if(isLiked) {
      // if exists then delete as user is unliking the post
      post.likes.delete(userId);
    } else {
      // add userid in likes dict as user liked the post
      post.likes.set(userId, true);
    }

    // updating the post in db by finding the post and then updating the like dict
    // and then return updated post data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true },
    );

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({
      status: "failure",
      message: error.message,
    });
  }
};
