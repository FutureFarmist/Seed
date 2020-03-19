import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NaasService } from '../../services/naas.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IDevice } from '../../models';
@Component({
  selector: 'device',
  template: `
    Devices 
  `,
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
   constructor(private naasSv: NaasService) {}

  ngOnInit() {
  }
}
