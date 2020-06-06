import Device from "./device";

export default class DeviceRepository {
  private static instance: DeviceRepository;
  static get defaultInstance(): DeviceRepository {
    if(!DeviceRepository.instance) {
      DeviceRepository.instance = new DeviceRepository();
    }
    return DeviceRepository.instance;
  }
  private devices: Device[];
  private constructor() {
    this.devices = [];
  }

  public addDevice(device: Device): void {
    this.devices.push(device);

    //TODO Trigger event?
  }

  public get Devices(): Device[] {
    return this.devices.slice(0);
  }

  public canUpdateDevice(stateTopic: string, data: any): boolean {
    const index = this.devices.findIndex(d => d.stateTopic === stateTopic);
    if(index === -1) {
      return false;
    }
    
    this.devices[index].latestData = data;
    // TODO Trigger event?

    return true;
  }



}