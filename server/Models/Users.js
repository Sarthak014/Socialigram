import mongoose from "mongoose";
import { validateName } from "../Utilities/Validators/nameValidator.js";
import { validateEmail } from "../Utilities/Validators/emailValidator.js";

// Schema
const schemaDefinition = {
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
    validate: {
      validator: (value) => validateName(value),
      message: () => "Invalid first name",
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
    validate: {
      validator: (value) => validateName(value),
      message: "Invalid last name",
    },
  },
  email: {
    type: String,
    required: [true, "Email id is required"],
    unique: true,
    max: 50,
    trim: true,
    validate: {
      validator: (value) => validateEmail(value),
      message: () => "Please fill a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 10,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  viewedProfile: {
    type: Number,
    default: 0,
  },
  impressions: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  occupation: {
    type: String,
  },
};

const userSchema = new mongoose.Schema(schemaDefinition, {
  collection: "Account",
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const User = mongoose.model("Account", userSchema);

export default User;
