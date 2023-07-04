import ServiceRegistry from "./lib/serviceRegistry.js";

class ServiceController {
  constructor(log) {
    this.log = log;
    this.serviecRegistry = new ServiceRegistry(log);
  }
  register = async (req, res, next) => {
    const { servicename, serviceversion, serviceport } = req.params;
    const ip = req.ip;

    // Regular expression for IPv4 address
    const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;

    const matches = ip.match(ipv4Regex);
    // Extract IPv4 address if matched, otherwise use the original IP
    const ipv4Address = matches ? matches[1] : ip;

    const result = this.serviecRegistry.register(
      servicename,
      serviceversion,
      ipv4Address,
      serviceport
    );
    this.log.debug(`service added : ${result}`);
    res.json(result);
  };
  unregister = async (req, res, next) => {
    const { servicename, serviceversion, serviceport } = req.params;
    const result = this.serviecRegistry.unregister(
      servicename,
      serviceversion,
      req.ip,
      serviceport
    );
    res.json(result);
  };
  findService = (req, res) => {
    this.log.info(JSON.stringify(req.params));
    const { servicename, serviceversion } = req.params;
    const result = this.serviecRegistry.get(servicename, serviceversion);
    this.log.info(
      `Detail for ${servicename} and ${serviceversion} is ${JSON.stringify(
        result
      )}`
    );
    res.json(result);
  };
}

export default ServiceController;
