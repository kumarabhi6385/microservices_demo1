import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
    index: {
      unique: true,
    },
    default: null,
  },
});
