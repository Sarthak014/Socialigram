import express from "express";
import { upload } from "../Utilities/fileUploadStorageMiddleware.js";
import { register } from "../controllers/auth.js";

const routing = express.Router();

/** Authentication and Authorization - Routes for files*/
routing.post("/auth/register", upload.single("picture"), register);

export { routing };
