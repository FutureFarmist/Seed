import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DeviceActions from './device.action';
import { Device } from '../../models';

export interface State extends EntityState<Device> {
  // additional entities state properties
  selectedDeviceId: number | null;
}
export function selectDeviceId(device: Device): string {
  //In this case this would be optional since primary key is id
  return device.Id;
};
export function sortByName(a: Device, b: Device): number {
  return a.Id.localeCompare(b.Id);
}
export const adapter: EntityAdapter<Device> = createEntityAdapter<Device>({
  selectId: selectDeviceId,
  sortComparer: sortByName
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedDeviceId: null,
});

const DeviceReducer = createReducer(
  initialState,
  on(DeviceActions.addDevice, (state, { Device }) => {
    return adapter.addOne(Device, state)
  }),
  on(DeviceActions.setDevice, (state, { Device }) => {
    return adapter.setOne(Device, state)
  }),
  on(DeviceActions.upsertDevice, (state, { Device }) => {
    return adapter.upsertOne(Device, state);
  }),
  on(DeviceActions.addDevices, (state, { Devices }) => {
    return adapter.addMany(Devices, state);
  }),
  on(DeviceActions.upsertDevices, (state, { Devices }) => {
    return adapter.upsertMany(Devices, state);
  }),
  on(DeviceActions.updateDevice, (state, { Device }) => {
    return adapter.updateOne(Device, state);
  }),
  on(DeviceActions.updateDevices, (state, { Devices }) => {
    return adapter.updateMany(Devices, state);
  }),
  on(DeviceActions.mapDevices, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(DeviceActions.deleteDevice, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(DeviceActions.deleteDevices, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(DeviceActions.deleteDevicesByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(DeviceActions.loadDevices, (state, { Devices }) => {
    return adapter.addAll(Devices, state);
  }),
  on(DeviceActions.clearDevices, state => {
    return adapter.removeAll({ ...state, selectedDeviceId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return DeviceReducer(state, action);
}

export const getSelectedDeviceId = (state: State) => state.selectedDeviceId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Device ids
export const selectDeviceIds = selectIds;

// select the dictionary of Device entities
export const selectDeviceEntities = selectEntities;

// select the array of Devices
export const selectAllDevices = selectAll;

// select the total Device count
export const selectDeviceTotal = selectTotal;