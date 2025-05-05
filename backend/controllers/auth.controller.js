const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { sendResponse } = require("../utils/utils");

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingEmail = await User.findOne({ email });
      // console.log(existingEmail);
      

      if (existingEmail) {
        return sendResponse(res, 400, false, "Email is already exist.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });

      sendResponse(res, 200, true, "Register Successfully.", user);
    } catch (error) {
      console.error("UserController register() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // console.log(email);
      // console.log(password);
      
      const existingEmail = await User.findOne({ email });

      if (!existingEmail) {
        return sendResponse(res, 400, false, "Incorrect email or password.");
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingEmail.password
      );

      if (!isPasswordMatch) {
        return sendResponse(res, 400, false, "Incorrect email or password.");
      }

      const token = jwt.sign(
        { _id: existingEmail._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );

      res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 * 3});

      sendResponse(res, 200, true, "Login Successfully.", existingEmail);
    } catch (error) {
      console.error("UserController login() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }

  static async getMe(req, res){
    // console.log(req.user);
    
    try {

      const user = await User.findById(req.user);

      sendResponse(res, 200, true, "Get Me Successfully.", user)
      
    } catch (error) {
      console.error("UserController getMe() error ", error);

      sendResponse(res, 500, false, "Server Error");
    }
  }

  static async logOut(req, res){

    res.cookie("jwt", '', { maxAge: 1});

    sendResponse(res, 200, true, "Log Out Successfully.")
  }
}

module.exports = UserController;
