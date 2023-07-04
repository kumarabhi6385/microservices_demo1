import mongoose from "mongoose";
import { TopicSchema } from "./topicModel.js";
import { ObjectId } from "bson";

const Topic = mongoose.model("Topic", TopicSchema);

class TopicController {
  constructor(log) {
    this.log = log;
  }
  addOrUpdateTopic = async (req, res, next) => {
    try {
      let topic = req.body;
      const category_id = new ObjectId(item.category_id);
      topic = await Topic.findOne({ category_id });
      if (!topic) {
        topic = new Topic({
          category_id,
          queries: item.queries,
        });
      } else {
        let queries = topic.queries.concat(item.queries);
        topic.queries = [...new Set(queries)];
      }
      topic.save();
      res.json(topic);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  getTopic = async (req, res, next) => {
    try {
      const category_id = new ObjectId(req.params.id);
      const topic = await Topic.findOne({ category_id });
      res.json(topic);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  getTopics = async (req, res, next) => {
    try {
      const topics = await Topic.find({});
      res.json(topics);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  deleteTopic = async (req, res, next) => {
    try {
      const id = req.body._id;
      const node = await Topic.findOne({ _id: new ObjectId(id) });
      if (!node) return next("Node not found");
      await Category.deleteOne({ _id: new ObjectId(id) });
      res.json(id);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
}

export default TopicController;
