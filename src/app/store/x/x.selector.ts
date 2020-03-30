import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromDevice from './x.reducer';

export interface State {
  devices: fromDevice.State;
}

export const reducers: ActionReducerMap<State> = {
  devices: fromDevice.reducer,
};

export const selectDeviceState = createFeatureSelector<fromDevice.State>('device');

export const selectDeviceIds = createSelector(
  selectDeviceState,
  fromDevice.selectDeviceIds // shorthand for devicesState => fromDevice.selectDeviceIds(devicesState)
);
export const selectDeviceEntities = createSelector(
  selectDeviceState,
  fromDevice.selectDeviceEntities
);
export const selectAllDevices = createSelector(
  selectDeviceState,
  fromDevice.selectAllDevices
);
export const selectDeviceTotal = createSelector(
  selectDeviceState,
  fromDevice.selectDeviceTotal
);

// export const selectCurrentDeviceId = createSelector(
//   selectDeviceState,
//   fromDevice.getSelectedDeviceId
// );

// export const selectCurrentDevice = createSelector(
//   selectDeviceEntities,
//   selectCurrentDeviceId,
//   (deviceEntities, deviceId) => deviceEntities[deviceId]
// );