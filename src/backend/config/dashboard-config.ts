import MqttConfig from "./mqtt-config";

export default interface DashboardConfig {
  port: number;
  mqtt: MqttConfig;
}

