import CategoryController from "./categoryController.js";
// This is middleware used for authentication and authorization
import { loginRequired } from "../middleware/authorization.js";

const routes = (service) => {
  const controller = new CategoryController(service.config.log);
  service
    .route("/category")
    // This API is used to get all categories
    .get(loginRequired, controller.getCategories)
    // This API is used to delete category
    .delete(loginRequired, controller.deleteCategoryandDescendants)
    // This API is used to create category
    .post(loginRequired, controller.createCategory);

  service
    .route("/category/:id")
    // This API is used to get category and its sub categories
    .get(loginRequired, controller.getCategory)
    // This API is used to update category name
    .put(loginRequired, controller.updateCategory);
};

export default routes;
