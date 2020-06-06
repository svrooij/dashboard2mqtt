import { DeviceType } from "./device-type";

export default interface Device {
  id: string;
  type: DeviceType;
  stateTopic?: string;
  name?: string;
  commandTopic?: string;
  latestData?: any;
}