import bcrypt from "bcrypt";
// import { Jwt } from "jsonwebtoken";
import User from "../Models/Users.js";

/** Register User */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    const genSalt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, genSalt);

    const registeredUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions,
      },
      {
        runValidators: true, //to run the validators which specified in the model
      }
    );

    res.status(201).json({
      status: 'success',
      data: {
        firstName,
        lastName,
        email,
      } = registeredUser,
    });

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
