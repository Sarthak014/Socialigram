import express from "express";
import { routePath } from "../Constants/routes.js";
import { upload } from "../Middleware/fileUploadStorage.js";
import { verifyToken } from "../middleware/authorize.js";
import { createPost } from "../Controllers/posts.js";
import { getFeedPosts, getUserPosts, likePost } from "../Controllers/posts.js";

const router = express.Router();

router.post("/posts", verifyToken, upload.single("picture"), createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get(routePath.getUserPost, verifyToken, getUserPosts);

// update
router.patch(routePath.likeUserPost, verifyToken, likePost);

export default router;
