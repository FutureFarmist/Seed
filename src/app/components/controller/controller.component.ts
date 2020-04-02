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
  @Input() ctl: models.Controller;
  @Output() ctlChange = new EventEmitter<models.Controller>();
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

  sensorsTx = 'Sensors';
  // trueDevicesTx = this.getTrueDeviceTx();
  falseDevicesTx = 'Device Working at False State';
  increasingDevicesTx = 'Device Working to Increase Value';
  decreasingDevicesTx = 'Device Working to Decrease Value';

  ngOnInit(): void {}

  ngAfterContentInit() {
    if (this.ctl) {
      this.controlPolicyFc.setValue(this.ctl.Policy);
      this.schemeFc.setValue(this.ctl.ControlScheme);

      if (this.ctl.Sensors) {
        this.sensorsFc.setValue(this.ctl.Sensors);
      }
      if (this.ctl.Factors) {
        this.controllingFactorFc.setValue(this.ctl.Factors);
      }
      if (this.ctl.IncreasingDevices) {
        this.increasingDevicesFc.setValue(this.ctl.IncreasingDevices);
      }
      if (this.ctl.DecreasingDevices) {
        this.decreasingDevicesFc.setValue(this.ctl.DecreasingDevices);
      }
      if (this.ctl.BoolTrueDevices) {
        this.trueDevicesFc.setValue(this.ctl.BoolTrueDevices);
      }
      if (this.ctl.BoolFalseDevices) {
        this.falseDevicesFc.setValue(this.ctl.BoolFalseDevices);
      }
    }
  }

  toggleActive() {
    if (this.ctl.Active) {
      this.ctl.Active = false;
    } else {
      this.ctl.Active = true;
    }
  }

  updateName(change: string) {
    if (change && this.ctl) {
      this.ctl.Name = change;
    }
  }

  updateDesc(change: string) {
    if (change && this.ctl) {
      this.ctl.Desc = change;
    }
  }

  updateSensors(change: Array<string>) {
    if (change && this.ctl) {
      this.ctl.Sensors = change;
      // this.ctl.Sensors = change.join(',');
    }
  }

  updateControllingFactor(change: number[]) {
    if (change && this.ctl) {
      this.ctl.Factors = change;
    }
  }

  updatePolicy(change: number) {
    if (change !== null && this.ctl) {
      this.ctl.Policy = +change;
    }
  }

  updateScheme(change: number) {
    if (change !== null && this.ctl) {
      this.ctl.ControlScheme = +change;
    }
  }

  updateOptimalVal(change: number) {
    if (change && this.ctl) {
      this.ctl.OptimalVal = +change;
    }
  }

  updateMinVal(change: number) {
    if (change && this.ctl) {
      this.ctl.PreferredMin = +change;
    }
  }

  updateMaxVal(change: number) {
    if (change && this.ctl) {
      this.ctl.PreferredMax = +change;
    }
  }

  updateIncreasingDevice(change: Array<string>) {
    if (change && this.ctl) {
      this.ctl.IncreasingDevices = change;
    }
  }

  updateDecreasingDevice(change: Array<string>) {
    if (change && this.ctl) {
      this.ctl.DecreasingDevices = change;
    }
  }

  updateTrueDevice(change: Array<string>) {
    if (change && this.ctl) {
      this.ctl.BoolTrueDevices = change;
    }
  }

  updateFalseDevice(change: Array<string>) {
    if (change && this.ctl) {
      this.ctl.BoolFalseDevices = change;
    }
  }

  getTrueDeviceTx(): string {
    if (this.ctl && this.ctl.Policy === this.TIME_POLICY) {
      return 'Working Device';
    } else {
      // this.ctl.ControlScheme) === this.BOOLEAN_CONTROL
      return 'Device Working at True State';
    }
  }
}
