import DashboardConfigLoader from "./config/dashboard-config-loader";
import DeviceRepository from "./devices/device-repository";
import DashboardMqtt from "./dashboard-mqtt";
import DashboardConfig from "./config/dashboard-config";
import DashboardServer from "./dasbboard-server";


class Dashboard {
  private config: DashboardConfig;
  private deviceRepository: DeviceRepository;
  private mqtt: DashboardMqtt;
  private server: DashboardServer;

  constructor() {
    this.config = DashboardConfigLoader.LoadConfig();
    this.deviceRepository = DeviceRepository.defaultInstance;
    this.mqtt = new DashboardMqtt(this.config.mqtt, this.deviceRepository);
    this.server = new DashboardServer(this.config.port);
  }

  public async stop (): Promise<void> {
    await this.mqtt.close().catch((err) => {
      console.warn('Error closing mqtt', err);
    });
    await this.server.close().catch((err) => {
      console.warn('Error closing web server', err);
    });
    console.log('Server closed');
  }
}


const dashboard = new Dashboard();
process.on('SIGINT', async () => {
  console.log('Exiting....');
  setTimeout(() => {
    process.exit(100);
  }, 1000)
  await dashboard.stop();
});
