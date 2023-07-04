import ServiceController from "./serviceController.js";

const routes = (service) => {
  const controller = new ServiceController(service.config.log);
  service
    .route("/register/:servicename/:serviceversion/:serviceport")
    // Below API is used to register microservices
    .put(controller.register);

  service
    .route("/unregister/:servicename/:serviceversion/:serviceport")
    // Below API is used to unregister microservices
    .delete(controller.unregister);

  service
    .route("/find/:servicename/:serviceversion")
    // Below API is used to unregister microservices
    .get(controller.findService);
  service.route("/").get((req, res, next) => {
    res.send("service Registry");
  });
};

export default routes;
