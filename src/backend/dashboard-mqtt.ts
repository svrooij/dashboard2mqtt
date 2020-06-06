
import mqtt, { MqttClient } from 'mqtt';
import MqttConfig from './config/mqtt-config';
import DeviceRepository from './devices/device-repository';
import Device from './devices/device';
import { DeviceType } from './devices/device-type';
export default class DashboardMqtt {
  private mqtt: MqttClient;
  constructor(private config: MqttConfig, private deviceRepository: DeviceRepository) {
    this.mqtt = mqtt.connect(config.url, {
      username: config.username,
      password: config.password,
      clientId: config.clientId
    });
    this.mqtt.on('message', (topic, payload, packet) => this.handleIncomingMessage(topic, payload, packet));
    this.mqtt.on('connect', () => {
      setTimeout(() => {
        this.subscribeForDiscovery();
      }, 500);
      
    })
    
  }

  private subscribeForDiscovery() {
    this.mqtt.subscribe(`${this.config.autoDiscovery}/binary_sensor/+/+/config`);
  }

  private handleIncomingMessage(topic: string, payload: Buffer, packet: mqtt.Packet) {
    let jsonPayload;
    try {
      jsonPayload = JSON.parse(payload.toString());
    } catch(err) {
      console.warn('Error parsing payload to json', err);
    }
    if(topic.startsWith(this.config.autoDiscovery) && topic.endsWith('config')) {
      this.handleAutoDiscovery(topic, jsonPayload);
    } else if (this.deviceRepository.canUpdateDevice(topic, jsonPayload)) {

    } else {
      console.log('Unhandled incoming message %s %s',topic, JSON.stringify(jsonPayload));
    }
  }

  private handleAutoDiscovery(topic: string, payload: any) {
    console.log('Auto discovery', payload)
    const device = {
      id: payload.unique_id,
      type: DeviceType.Unknown,
      stateTopic: payload.state_topic,
      name: payload.name
    } as Device;
    const parts = topic.split('/');
    if (parts[1] === 'binary_sensor' && parts[parts.length - 2] === 'contact') {
      device.type = DeviceType.ContactSensor;
    } else if (parts[1] === 'binary_sensor' && parts[parts.length - 2] === 'occupancy') {
      device.type = DeviceType.OccupancySensor;
    }

    if(device.type !== DeviceType.Unknown) {
      this.deviceRepository.addDevice(device);
      if(device.stateTopic) {
        this.mqtt.subscribe(device.stateTopic);
      }
    }
    
    

  }

  public async close(): Promise<void> {
    if(!this.mqtt?.connected) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.mqtt.end(false, undefined, ()=> {
        resolve();
      })
    });
  }

}
