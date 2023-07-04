import { ObjectId } from "bson";
import { Schema } from "mongoose";

export const TopicSchema = new Schema({
  category_id: {
    type: ObjectId,
    required: true,
  },
  queries: [String],
});
