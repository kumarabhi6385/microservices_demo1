import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserSchema } from "./userModel.js";
import jwt from "jsonwebtoken";
const User = mongoose.model("User", UserSchema);

class UserController {
  constructor(log, salt, secret, expiry) {
    this.log = log;
    this.salt = parseInt(salt);
    this.tokenExpiry = expiry;
    this.secret = secret;
  }
  register = async (req, res, next) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        user = new User({
          email: req.body.email,
          username: req.body.username,
        });
        user.hashPassword = await bcrypt.hash(req.body.password, this.salt);
        await user.save();
        res.json(user);
      } else {
        return next("User already exist");
      }
    } catch (err) {
      this.log.error(`Error while login: ${err}`);
      return next(err);
    }
  };
  login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(401).json({
            msg: "Unauthorized: User not found",
          });
        } else {
          if (!user.comparePassword(req.body.password, user.hashPassword)) {
            res.status(401).json({
              msg: "Unauthorized: Wrong password",
            });
          } else {
            res.json({
              token: jwt.sign(
                {
                  email: user.email,
                  username: user.username,
                  _id: user._id,
                },
                this.secret,
                { expiresIn: this.tokenExpiry }
              ),
            });
          }
        }
      })
      .catch((err) => {
        this.log.error(`Error while login: ${err}`);
        return next(err);
      });
  };
}

export default UserController;
