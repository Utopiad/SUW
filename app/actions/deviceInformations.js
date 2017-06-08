import DeviceInfo from 'react-native-device-info';

export default class DeviceInformations {
  constructor() {

    this.getThemAll = this.getThemAll.bind(this);

  }

  getThemAll() {
    return(
      {
        uuid:         DeviceInfo.getUniqueID(),
        manufacturer: DeviceInfo.getManufacturer(),
        brand:        DeviceInfo.getBrand(),
        model:        DeviceInfo.getModel(),
        os:           DeviceInfo.getSystemName(),
        osVersion:    DeviceInfo.getSystemVersion(),
        buildNumber:  DeviceInfo.getBuildNumber(),
        localLang:    DeviceInfo.getDeviceLocale(),
        country:      DeviceInfo.getDeviceCountry(),
        timeZone:     DeviceInfo.getTimezone(),
        isTablet:     DeviceInfo.isTablet() || false
      }
    )
  }

  retry(prop) {
    switch(prop) {
      case uuid:
        this.uuid = DeviceInfo.getUniqueID();
        break;
      case manufacturer:
        this.manufacturer = DeviceInfo.getManufacturer();
        break;
      case brand:
        this.brand = DeviceInfo.getBrand();
        break;
      case model:
        this.model = DeviceInfo.getModel();
        break;
      case os:
        this.os = DeviceInfo.getSystemName();
        break;
      case osVersion:
        this.osVersion = DeviceInfo.getSystemVersion();
        break;
      case buildNumber:
        this.buildNumber = DeviceInfo.getBuildNumber();
        break;
      case localLang:
        this.localLang = DeviceInfo.getDeviceLocale();
        break;
      case country:
        this.country = DeviceInfo.getDeviceCountry();
        break;
      case timeZone:
        this.timeZone = DeviceInfo.getTimezone();
        break;
      case isTablet:
        this.isTablet = DeviceInfo.isTablet();
        break;
      default:
        this.uuid = DeviceInfo.getUniqueID();
        this.manufacturer = DeviceInfo.getManufacturer();
        this.brand = DeviceInfo.getBrand();
        this.model = DeviceInfo.getModel();
        this.os = DeviceInfo.getSystemName();
        this.osVersion = DeviceInfo.getSystemVersion();
        this.buildNumber = DeviceInfo.getBuildNumber();
        this.localLang = DeviceInfo.getDeviceLocale();
        this.country = DeviceInfo.getDeviceCountry();
        this.timeZone = DeviceInfo.getTimezone();
        this.isTablet = DeviceInfo.isTablet() || false;
    }

  }
}
