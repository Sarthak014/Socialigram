import express from "express";
import { routePath } from "../Constants/routes.js";
import { verifyToken } from "../middleware/authorize.js";
import {
  getUser,
  getUserFriends,
  updateUserFriend,
} from "../Controllers/users.js";

const router = express.Router();

// Read - grabbing the info
router.get(routePath.home, verifyToken, getUser);
router.get(routePath.userFriends, verifyToken, getUserFriends);

// update friend list without changing the whole data.
router.patch(routePath.updateUserFriend, verifyToken, updateUserFriend);

export default router;
