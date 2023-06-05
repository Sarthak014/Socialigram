import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/Users.js";
import { validatePassword } from "../Utilities/Validators/passwordValidator.js";

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

    if(!validatePassword(password)) {
      return res.status(400).json({
        status: 'invalid',
        message: 'Invalid password format',
      });
    }

    const genSalt = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, genSalt);

    // TODO: Needs to check whwther the existing user is getting inserted/updated in DB, which shouldn't happen

    try {
      const registerUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends: friends || [],
        location,
        occupation
      });

      await registerUser.save();

      res.status(201).json({
        status: 'success',
        data: {
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) {
      res.status(503).json({
        status: 'fail',
        message: 'Encountered Network Error',
      });
    }

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

/** Logging In */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'invalid',
        message: 'Invalid Credentials',
      });
    }

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      return res.status(400).json({
        status: 'invalid',
        message: 'Invalid Credentials',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_SIGN, {
      expiresIn: '3m'
    });

    delete user.password;

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
