import express from "express";
import { routePath } from "../Constants/routes.js";
import { upload } from "../Middleware/fileUploadStorage.js";
import { verifyToken } from "../Middleware/authorize.js";
import { createPost } from "../Controllers/posts.js";
import { getFeedPosts, getUserPosts, likePost } from "../Controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get(routePath.getUserPost, verifyToken, getUserPosts);

// Insert Post
router.post(routePath.createPost, verifyToken, upload.single("picture"), createPost);

// Update
router.patch(routePath.likeUserPost, verifyToken, likePost);

export default router;
