import UserController from "./userController.js";

const routes = (service) => {
  const controller = new UserController(service.config.log);
  service
    .route("/auth/register")
    // Below API is used for registration purpose
    .post(controller.register);

  service
    .route("/login")
    // Below API is used for login
    .post(controller.login);
};

export default routes;
