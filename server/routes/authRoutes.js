import express from "express";
import { upload } from "../Middleware/fileUploadStorage.js";
import { register, login } from "../controllers/auth.js";
import { routePath } from "../Constants/routes.js";

const router = express.Router();

/** Authentication and Authorization - Routes for files*/
router.post(routePath.userRegistration, upload.single("picture"), register);
router.post(routePath.userLogin, login);

export default router;
