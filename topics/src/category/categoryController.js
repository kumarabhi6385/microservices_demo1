import mongoose from "mongoose";
import { CategorySchema } from "./categoryModel.js";
import { ObjectId } from "bson";

const Category = mongoose.model("Category", CategorySchema);

class CategoryController {
  constructor(log) {
    this.log;
  }
  getCategories = async (req, res, next) => {
    try {
      const data = await Category.find().sort({ path: 1 });
      res.json(data);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  getCategory = async (req, res, next) => {
    try {
      const category_id = new ObjectId(req.params.id);
      const node = await Category.findOne({ _id: category_id });
      if (node) {
        const regexPath = new RegExp(`^${node.path}`);
        const data = await Category.find({ path: { $regex: regexPath } });
        res.json(data);
      } else return next("Category Not Found");
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  updateCategory = async (req, res, next) => {
    try {
      const category = req.body;
      category.category_id = new ObjectId(req.params.id);
      const node = await Category.findOne({ _id: ObjectId(category._id) });
      if (node) {
        node.name = category.name;
        await Category.updateOne(
          { _id: ObjectId(category._id) },
          { $set: node }
        );
        res.json(node);
      } else return next("Category Not found");
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  createCategory = async (req, res, next) => {
    try {
      const category = req.body;
      const newCategory = new Category({
        name: category.name,
        path: category.path,
      });
      await newCategory.save();
      res.json(newCategory);
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
  deleteCategoryandDescendants = async (req, res, next) => {
    try {
      const id = req.body._id;
      const node = await Category.findOne({ _id: new ObjectId(id) });
      if (!node) return next("Category Not Found");
      else {
        const childIds = node.children || [];
        await Category.deleteOne({ _id: new ObjectId(id) });

        for (const childId of childIds) {
          await deleteCategoryandDescendants(childId);
        }
        res.json(id);
      }
    } catch (err) {
      this.log.error(err);
      return next(err);
    }
  };
}

export default CategoryController;
