export default interface MqttConfig {
  url: string;
  username?: string;
  password?: string;
  clientId?: string;
  autoDiscovery: string;
}