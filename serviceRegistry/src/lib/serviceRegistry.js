import semver from "semver";

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
  }
  get(name, version) {
    const candidates = Object.values(this.services).filter(
      (service) =>
        service.name === name && semver.satisfies(service.version, version)
    );
    if (candidates.length > 1)
      return candidates[Math.floor(Math.random() * candidates.length)];
    else return candidates[0];
  }
  register(name, version, ip, port) {
    const key = name + version + ip + port;
    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].name = name;
      this.services[key].version = version;
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.log.info(
        `Added service ${name}, version ${version} at ${ip}:${port}`
      );
    } else {
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.log.info(
        `Updated services ${name}, version ${version} at ${ip}:${port}`
      );
    }
    return key;
  }
  unregister(name, version, ip, port) {
    const key = name + version + ip + port;
    delete this.services[key];
    this.log.info(
      `deleted services ${name}, version ${version} at ${ip}:${port}`
    );
    return key;
  }
}

export default ServiceRegistry;
