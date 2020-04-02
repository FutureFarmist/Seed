
export interface Device {
  Id?: string;

  /* Device Id  */
  DeviceId?: string;
  Name?: string;
  Desc?: string;

  Pin?: number;
  GPIO?: number;

  Status?: number;


  /* Pin type
    GPIO = 0, default
    Ground = 1
  */
  PinType?: number;

  /* Pin mode
    Input = 0, default
    Output = 1
  */
  PinMode?: number;

  /* Active status
  Active?: boolean;*/

  /* Factor identifier */
  Factor?: string;

  FactorManipulator?: string;

  /* Unit of measurement */
  Unit?: string;

  /* Current active status for actuator device, output mode
  and also boolean state of sensor device, input mode */
  BoolState?: boolean;

  /* latest values attached to device_id */
  Value1?: number;
  Value2?: number;
  Value3?: number;

}

export interface Plant {
  Id: string;

}

export interface Field {
  Id: string;
}

export interface DeviceInfo {
  DeviceId: string;
  Name: string;

  PinType: number;
  PinMode: number;

  ControlScheme?: number;
}

export const DEVICE_LIST: Array<DeviceInfo> = [
  {
    DeviceId: 'relay-pin',
    Name: 'Relay Pin',
    PinMode: 1,
    PinType: 0,
    ControlScheme: 0,
  },
  {
    DeviceId: 'humi-temp-sensor',
    Name: 'Humi-temp sensor',
    PinMode: 0,
    PinType: 0,
    ControlScheme: 0,
  },
  {
    DeviceId: 'humi-sensor',
    Name: 'Humidity sensor',
    PinMode: 0,
    PinType: 0,
    ControlScheme: 0,
  }
];

/* To set auto setting working with devices */
export interface Controller {
  Id?: number;
  Name?: string;
  Desc?: string;

  Active?: Boolean;

  Sensors?: string[];
  // DeviceLinks?: Array<DeviceLink>;

  Policy?: number;

  Factors?: number[];

  ControlScheme?: number;

  // TIME_POLICY + TIME_MEASUREMENT_POLICY

  // cron code
  Cron?: Cron | null;

  // ActiveDaily?: Boolean;
  // ActiveWeekDayRanges?: string[];
  // ActiveMonthDayRanges?: string[];
  // ActiveMonthRanges?: string[];
  // TimePeriods?: string[];

  // SessionStartDate?: string;
  // SeasonEndDate?: string;

  // VALUE_CONTROL scheme

  OptimalVal?: number;
  PreferredMin?: number;
  PreferredMax?: number;

  IncreasingDevices?: string[];
  DecreasingDevices?: string[];

  // BOOLEAN_CONTROL scheme
  // PreferredState?: Boolean;

  BoolTrueDevices?: string[];
  BoolFalseDevices?: string[];
}

export interface Cron {
  Second?: string;
  Minute?: string;
  Hour?: string;
  Dom?: string;
  Month?: string;
  Dow?: string;
  Year?: string;
}

export const DEVICE_INACTIVE = 0;
export const DEVICE_ACTIVE = 1;
export const DEVICE_ERROR = 2;


export const CONTROLLING_FACTORS = [
  {
    name: "Ground Humidity",
    value: 1
  },
  {
    name: "Ground Temperature",
    value: 2
  },
  {
    name: "Air Humidity",
    value: 3
  },
  {
    name: "Air Temperature",
    value: 3
  },

];

export const TIME_POLICY = 0;
export const MEASUREMENT_POLICY = 1;
export const TIME_MEASUREMENT_POLICY = 2;

export const CONTROL_POLICIES = [
         {
           name: 'Time Policy',
           value: TIME_POLICY
         },
         {
           name: 'Measurement Policy',
           value: MEASUREMENT_POLICY
         },
         {
           name: 'Time and Measurement Policy',
           value: TIME_MEASUREMENT_POLICY
         }
       ];

export const VALUE_CONTROL = 0;
export const BOOLEAN_CONTROL = 1;

export const SCHEMES = [
         {
           name: 'Value',
           value: VALUE_CONTROL,
           desc: 'Working with numeric value. 3.14, 37, ...'
         },
         {
           name: 'Boolean',
           value: BOOLEAN_CONTROL,
           desc: 'Workign with boolean value, true and false.'
         }
       ];

// Pin Type
export const PIN_GPIO = 0;
export const PIN_GROUND = 1;
export const PIN_POWER3v3 = 2;
export const PIN_POWER5v = 3;

// Pin Mode
export const PIN_MODE_INPUT = 0;
export const PIN_MODE_OUTPUT = 1;
