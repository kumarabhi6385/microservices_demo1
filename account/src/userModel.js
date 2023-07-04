import { Schema } from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = async (password, hashPassword) => {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hashPassword, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
