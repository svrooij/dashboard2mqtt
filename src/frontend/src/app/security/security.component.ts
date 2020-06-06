import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import Device from '../services/device';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent implements OnInit {
  public devices$: Promise<Device[]>
  constructor(private deviceService: DeviceService) {
    this.devices$ = deviceService.getDevices();
   }

  ngOnInit(): void {
  }

}
