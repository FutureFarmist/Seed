import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs';

import { XActionTypes, XActions } from './x.action';

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
    action: XActions
): State {
    switch (action.type) {
        case XActionTypes.Y:
            return {
                ...state,
                y: true,
            };

        default:
            return state;
    }
}

export const getY = (state: State) => state.y;
