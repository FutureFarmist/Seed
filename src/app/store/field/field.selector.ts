import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromField from './field.reducer';

export interface State {
  fields: fromField.State;
}

export const reducers: ActionReducerMap<State> = {
  fields: fromField.reducer,
};

export const selectFieldState = createFeatureSelector<fromField.State>('field');

export const selectFieldIds = createSelector(
  selectFieldState,
  fromField.selectFieldIds // shorthand for fieldsState => fromField.selectFieldIds(fieldsState)
);
export const selectFieldEntities = createSelector(
  selectFieldState,
  fromField.selectFieldEntities
);
export const selectAllFields = createSelector(
  selectFieldState,
  fromField.selectAllFields
);
export const selectFieldTotal = createSelector(
  selectFieldState,
  fromField.selectFieldTotal
);
export const selectCurrentFieldId = createSelector(
  selectFieldState,
  fromField.getSelectedFieldId
);

export const selectCurrentField = createSelector(
  selectFieldEntities,
  selectCurrentFieldId,
  (fieldEntities, fieldId) => fieldEntities[fieldId]
);