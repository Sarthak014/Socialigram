import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/posts.js";

/** Uncomment for adding mock data to the DB server */
// import User from "./Models/Users.js";
// import Post from "./Models/Post.js";
// import { users, posts } from "./data/mockData.js";

/** CONFIGURATIONS - Middleware and Application Config */

// get the file path when we import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

mongoose.Promise = global.Promise; 
mongoose
  .connect(
    process.env.MONGO_URL,
    // provide db name for connection
    {
      dbName: 'Socialigram'
    },
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Starting Server Port: ${PORT}`));

    // Uncomment the below lines to populate the DB with mock data
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} - Did not connect`));
