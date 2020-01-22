import { Action, ActionReducer } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { FieldActionTypes, FieldActions } from './field.action';
import { IField } from '../../model';

export interface State extends EntityState<IField> {
    // StarterResource: IResource | null;
}

export const adapter: EntityAdapter<IField> = createEntityAdapter<IField>({
    selectId: (field: IField) => field.Id,
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
    action: FieldActions
): State {
    switch (action.type) {
        case FieldActionTypes.Y:
            return {
                ...state,
                // id: "1234",
            };

        default:
            return state;
    }
}

// export const getY = (state: State) => state.y;
