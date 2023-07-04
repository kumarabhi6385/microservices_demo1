import ServiceController from "./serviceController.js";

const routes = (app) => {
  const controller = new ServiceController();
  app
    .route("/register")
    // Below API is used to register microservices
    .post(controller.register);

  app
    .route("/unregister")
    // Below API is used to unregister microservices
    .delete(controller.unregister);

  app
    .route("/find/:name/:version")
    // Below API is used to unregister microservices
    .get(controller.findService);
};

export default routes;
