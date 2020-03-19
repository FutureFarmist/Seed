import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs';

import { PlantActionTypes, PlantActions } from './plant.action';
import { IPlant } from '../../models';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<IPlant> {
    // StarterResource: IResource | null;
}

export const adapter: EntityAdapter<IPlant> = createEntityAdapter<IPlant>({
  selectId: (plant: IPlant) => plant.Id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    // StarterResource: null,
});

/* export interface State {
    y: boolean;
}

const initialState: State = {
    y: true,
}; */

export function reducer(
    state: State = initialState,
    action: PlantActions
): State {
    switch (action.type) {
        case PlantActionTypes.Y:
            return {
                ...state,
                // y: true,
            };

        default:
            return state;
    }
}

// export const getY = (state: State) => state.y;
