import { Component, OnInit, Input } from '@angular/core';
import { SensorValue } from 'src/app/models';
import { NaasService } from 'src/app/services/naas.service';

@Component({
  selector: 'sensor-values',
  template: `
    <div *ngFor="let sensorValue of SensorValues" >
      <div [ngSwitch]="sensorValue.Factor">
        <div class="desc" *ngSwitchCase="1">Soil Humidity</div>
        <div class="desc" *ngSwitchCase="2">Soil Temperature </div>
        <div class="desc" *ngSwitchCase="3">Air Humidity </div>
        <div class="desc" *ngSwitchCase="4">Air Temperature </div>
      </div><div class="value">
        {{ sensorValue.Value }}
      </div>
    </div>`,
  styles: [`
    .value {
      padding: 3px auto;
      font-size: 18px;
    };
    .desc {
      font-size: 12px;
    }
  `]
})
export class SensorValuesComponent implements OnInit {
  @Input() SensorValues: SensorValue;
  // TODO: adding unit to value
  // unit = "";
  constructor(private naasSv: NaasService) { 
    // this.naasSv.getDeviceInfo(this.SensorValues.Device_id).
  }

  ngOnInit(): void {
  }

}
