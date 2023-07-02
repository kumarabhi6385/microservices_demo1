import ServiceController from './serviceController.js'

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
    .route("/services")
    // Below API is used to unregister microservices
    .get(controller.getservices);
};

export default routes;