import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import * as models from '../../models';
import { FormControl } from '@angular/forms';
import { NaasService } from '../../services/naas.service';

@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit, AfterContentInit {
  @Input() contlr: models.Controller;
  @Output() contlrChange = new EventEmitter<models.Controller>();
  constructor(private naasSv: NaasService) {}

  controllingFactors = models.CONTROLLING_FACTORS;
  controlPolicies = models.CONTROL_POLICIES;
  schemes = models.SCHEMES;

  TIME_POLICY = models.TIME_POLICY;
  MEASUREMENT_POLICY = models.MEASUREMENT_POLICY;
  TIME_MEASUREMENT_POLICY = models.TIME_MEASUREMENT_POLICY;

  BOOLEAN_CONTROL = models.BOOLEAN_CONTROL;
  VALUE_CONTROL = models.VALUE_CONTROL;

  // sensor devices(pin)

  /* sensors = this.naasSv.deviceArray.filter((device) => {
    device.PinType !== models.PIN_GROUND && device.PinMode === models.PIN_MODE_INPUT;
  }); */
  sensors = this.naasSv.sensors;

  // control devices(pin)
  actuators = this.naasSv.actuators;

  available_factors = this.controllingFactors;
  /* decreasingDevices = [];
  increasingDevices = [];

  trueDevices = [];
  falseDevices = []; */

  controllingFactorFc = new FormControl();
  controlPolicyFc = new FormControl();
  schemeFc = new FormControl();
  sensorsFc = new FormControl();
  decreasingDevicesFc = new FormControl();
  increasingDevicesFc = new FormControl();
  trueDevicesFc = new FormControl();
  falseDevicesFc = new FormControl();

  sensorsTx = 'Sensor';
  // trueDevicesTx = this.getTrueDeviceTx();
  falseDevicesTx = 'Device Working at False State';
  increasingDevicesTx = 'Device Working to Increase Value';
  decreasingDevicesTx = 'Device Working to Decrease Value';

  ngOnInit(): void {}

  ngAfterContentInit() {
    if (this.contlr) {
      this.controlPolicyFc.setValue(this.contlr.Policy);
      this.schemeFc.setValue(this.contlr.ControlScheme);

      if (this.contlr.Sensor) {
        this.sensorsFc.setValue(this.contlr.Sensor);
      }
      if (this.contlr.Factor) {
        this.controllingFactorFc.setValue(this.contlr.Factor);
      }
      if (this.contlr.IncreasingDevices) {
        this.increasingDevicesFc.setValue(this.contlr.IncreasingDevices);
      }
      if (this.contlr.DecreasingDevices) {
        this.decreasingDevicesFc.setValue(this.contlr.DecreasingDevices);
      }
      if (this.contlr.BoolTrueDevices) {
        this.trueDevicesFc.setValue(this.contlr.BoolTrueDevices);
      }
      if (this.contlr.BoolFalseDevices) {
        this.falseDevicesFc.setValue(this.contlr.BoolFalseDevices);
      }
    }
  }
  
  getFactors() {
    if(this.contlr && this.contlr.Sensor) {
      console.log("getFactors");
      var info = this.naasSv.getDeviceInfo(this.contlr.Sensor);
      var all_factors = [];
      if (info && info.Factors) {
        console.log("f1");
        all_factors = info.Factors.split(',');
      }
      if (all_factors.length > 0) {
        console.log("f2");
        this.available_factors = this.controllingFactors.filter(val => {
          for (let info of all_factors) {
            if (val.value == (+info)) {
              console.log("f3");
              return true;
            } 
          }
        });
      } else {
        console.log("f4");
        this.available_factors = this.controllingFactors;
      }
    }
  }

  toggleActive() {
    if (this.contlr.Active) {
      this.contlr.Active = false;
    } else {
      this.contlr.Active = true;
    }
  }

  updateName(change: string) {
    if (change && this.contlr) {
      this.contlr.Name = change;
    }
  }

  updateDesc(change: string) {
    if (change && this.contlr) {
      this.contlr.Desc = change;
    }
  }

  updateSensor(change: string) {
    if (change && this.contlr) {
      this.contlr.Sensor = change;
      // this.contlr.Sensor = change.join(',');
      this.getFactors();
    }
  }

  updateControllingFactor(change: number) {
    if (change && this.contlr) {
      this.contlr.Factor = change;
      // var device_info = this.naasSv.getDeviceInfo(this.contlr.Sensor);
      // this should update control scheme automatically due to it knows what's is the factor to be control
      // but lastly, it's depend on device that determines scheme of sensor even the same factor
      // this.updateScheme()
    }
  }

  updatePolicy(change: number) {
    if (change !== null && this.contlr) {
      this.contlr.Policy = +change;
    }
  }

  updateScheme(change: number) {
    if (change !== null && this.contlr) {
      this.contlr.ControlScheme = +change;
    }
  }

  updateOptimalVal(change: number) {
    if (change && this.contlr) {
      this.contlr.OptimalVal = +change;
    }
  }

  updateMinVal(change: number) {
    if (change && this.contlr) {
      this.contlr.PreferredMin = +change;
    }
  }

  updateMaxVal(change: number) {
    if (change && this.contlr) {
      this.contlr.PreferredMax = +change;
    }
  }

  updateIncreasingDevice(change: Array<string>) {
    if (change && this.contlr) {
      this.contlr.IncreasingDevices = change;
    }
  }

  updateDecreasingDevice(change: Array<string>) {
    if (change && this.contlr) {
      this.contlr.DecreasingDevices = change;
    }
  }

  updateTrueDevice(change: Array<string>) {
    if (change && this.contlr) {
      this.contlr.BoolTrueDevices = change;
    }
  }

  updateFalseDevice(change: Array<string>) {
    if (change && this.contlr) {
      this.contlr.BoolFalseDevices = change;
    }
  }

  getTrueDeviceTx(): string {
    if (this.contlr && this.contlr.Policy === this.TIME_POLICY) {
      return 'Working Device';
    } else {
      // this.contlr.ControlScheme) === this.BOOLEAN_CONTROL
      return 'Device Working at True State';
    }
  }
}
