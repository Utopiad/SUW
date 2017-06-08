import DeviceInfo from 'react-native-device-info';

export default class DeviceInformations {
  constructor() {
    this.uuid = DeviceInfo.getUniqueID();
    this.manufacturer = DeviceInfo.getManufacturer();
    this.brand = DeviceInfo.getBrand();
    this.model = DeviceInfo.getModel();
    this.system = DeviceInfo.getSystemName();
    this.os_version = DeviceInfo.getSystemVersion();
    this.build_number = DeviceInfo.getBuildNumber();
    this.local = DeviceInfo.getDeviceLocale();
    this.timezone = DeviceInfo.getTimezone();
    this.is_tablet = DeviceInfo.isTablet();
    this.getGeolocation();
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        // this.accuracy = position.coords.accuracy;
      }
    );
  }

  retry(prop) {
    switch(prop) {
      case "uuid":
        this.uuid = DeviceInfo.getUniqueID();
        break;
      case "manufacturer":
        this.manufacturer = DeviceInfo.getManufacturer();
        break;
      case "brand":
        this.brand = DeviceInfo.getBrand();
        break;
      case "model":
        this.model = DeviceInfo.getModel();
        break;
      case "system":
        this.system = DeviceInfo.getSystemName();
        break;
      case "os_version":
        this.os_version = DeviceInfo.getSystemVersion();
        break;
      case "build_number":
        this.build_number = DeviceInfo.getBuildNumber();
        break;
      case "local":
        this.local = DeviceInfo.getDeviceLocale();
        break;
      case "timezone":
        this.timezone = DeviceInfo.getTimezone();
        break;
      case "is_tablet":
        this.is_tablet = DeviceInfo.isTablet();
        break;
      case "geo":
        this.getGeolocation();
        break;
      default:
        this.uuid = DeviceInfo.getUniqueID();
        this.manufacturer = DeviceInfo.getManufacturer();
        this.brand = DeviceInfo.getBrand();
        this.model = DeviceInfo.getModel();
        this.system = DeviceInfo.getSystemName();
        this.os_version = DeviceInfo.getSystemVersion();
        this.build_number = DeviceInfo.getBuildNumber();
        this.local = DeviceInfo.getDeviceLocale();
        this.timezone = DeviceInfo.getTimezone();
        this.is_tablet = DeviceInfo.isTablet();
        this.getGeolocation();
    }
  }

  toJSON() {
    return {
      uuid: this.uuid,
      manufacturer: this.manufacturer,
      brand: this.brand,
      model: this.model,
      system: this.system,
      os_version: this.os_version,
      build_number: this.build_number,
      local: this.local,
      timezone: this.timezone,
      is_tablet: this.is_tablet,
      // accuracy: this.accuracy,
      longitude: this.longitude,
      latitude: this.latitude
    }
  }
}
