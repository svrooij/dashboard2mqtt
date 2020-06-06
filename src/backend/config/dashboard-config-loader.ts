import DashboardConfig from "./dashboard-config";

export default class DashboardConfigLoader {
  static LoadConfig(): DashboardConfig {
    return DashboardConfigLoader.DefaultConfig();
  }

  private static DefaultConfig(): DashboardConfig {
    return {
      port: 3000,
      mqtt: {
        url: 'mqtt://localhost:1883',
        autoDiscovery: 'homeassistant',
        username: '',
        password: ''
      }
    }
  }
}