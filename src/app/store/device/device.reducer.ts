import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs';

import { DeviceActionTypes, DeviceActions } from './device.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IDevice } from '../../models';

export interface State extends EntityState<IDevice> {
    // y: null;
}

export const adapter: EntityAdapter<IDevice> = createEntityAdapter<IDevice>({
    selectId: (device: IDevice) => device.Id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    // y: null
});

/* export interface State {
    y: boolean;
}

const initialState: State = {
    y: true,
}; */

export function reducer(
    state: State = initialState,
    action: DeviceActions
): State {
    switch (action.type) {
        case DeviceActionTypes.Y:
            return {
                ...state,
                // y: true,
            };

        default:
            return state;
    }
}

// export const getY = (state: State) => state.y;
