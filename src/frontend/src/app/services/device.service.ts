import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Device from './device';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  public async getDevices(): Promise<Device[]> {
    return this.http.get('/api/v1/devices', { responseType: 'json'})
      .toPromise()
      .then(data => {
        return data as Device[]
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })

  }
}
