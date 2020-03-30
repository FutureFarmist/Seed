import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromController from './controller.reducer';
import * as fromIndex from '../index';

export interface State {
  controllers: fromController.State;
}

export const reducers: ActionReducerMap<State> = {
  controllers: fromController.reducer,
};

/* export const selectControllerState = createSelector(fromIndex.State,
  (state) => {
    state.
  }); */
export const selectControllerState = createFeatureSelector<fromIndex.State, fromController.State>('controller');

export const selectControllerIds = createSelector(
  selectControllerState,
  fromController.selectControllerIds // shorthand for controllersState => fromController.selectControllerIds(controllersState)
  );
export const selectControllerEntities = createSelector(
  selectControllerState,
  fromController.selectControllerEntities
  );
export const selectAllControllers = createSelector(
  selectControllerState,
  fromController.selectAllControllers
  );
export const selectControllerTotal = createSelector(
  selectControllerState,
  fromController.selectControllerTotal
);


// export const selectCurrentControllerId = createSelector(
//   selectControllerState,
//   fromController.getSelectedControllerId
// );

/* export const selectCurrentController = createSelector(
  selectControllerEntities,
  selectCurrentControllerId,
  (controllerEntities, controllerId) => controllerEntities[controllerId]
); */