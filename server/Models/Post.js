import mongoose from "mongoose";

// Schema
const schemaDefinition = {
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
};

const postSchema = new mongoose.Schema(schemaDefinition, {
  collection: "Post",
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
