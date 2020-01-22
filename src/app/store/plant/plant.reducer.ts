import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs';

import { PlantActionTypes, PlantActions } from './plant.action';

/* export interface State extends EntityState<IDesk> {
    StarterResource: IResource | null;
}

export const adapter: EntityAdapter<IDesk> = createEntityAdapter<IDesk>({
    selectId: (desk: IDesk) => desk.Id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    StarterResource: null,
}); */

export interface State {
    y: boolean;
}

const initialState: State = {
    y: true,
};

export function reducer(
    state: State = initialState,
    action: PlantActions
): State {
    switch (action.type) {
        case PlantActionTypes.Y:
            return {
                ...state,
                y: true,
            };

        default:
            return state;
    }
}

export const getY = (state: State) => state.y;
