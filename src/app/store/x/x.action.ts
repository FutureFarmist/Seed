import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
import { Device } from '../../models';

export const loadDevices = createAction('[Device/API] Load Devices', props<{ Devices: Device[] }>());
export const addDevice = createAction('[Device/API] Add Device', props<{ Device: Device }>());
export const setDevice = createAction('[Device/API] Set Device', props<{ Device: Device }>());
export const upsertDevice = createAction('[Device/API] Upsert Device', props<{ Device: Device }>());
export const addDevices = createAction('[Device/API] Add Devices', props<{ Devices: Device[] }>());
export const upsertDevices = createAction('[Device/API] Upsert Devices', props<{ Devices: Device[] }>());
export const updateDevice = createAction('[Device/API] Update Device', props<{ Device: Update<Device> }>());
export const updateDevices = createAction('[Device/API] Update Devices', props<{ Devices: Update<Device>[] }>());
export const mapDevices = createAction('[Device/API] Map Devices', props<{ entityMap: EntityMap<Device> }>());
export const deleteDevice = createAction('[Device/API] Delete Device', props<{ id: string }>());
export const deleteDevices = createAction('[Device/API] Delete Devices', props<{ ids: string[] }>());
export const deleteDevicesByPredicate = createAction('[Device/API] Delete Devices By Predicate', props<{ predicate: Predicate<Device> }>());
export const clearDevices = createAction('[Device/API] Clear Devices');