import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ControllerActions from './controller.action';
import { Controller } from '../../models';

export interface State extends EntityState<Controller> {
  // additional entities state properties
  // selectedControllerId: number | null;
}

export function selectUserId(ctl: Controller): number {
  //In this case this would be optional since primary key is id
  return ctl.Id;
};
export function sortById(a: Controller, b: Controller): number {
  return a.Id - b.Id;
}
export const adapter: EntityAdapter<Controller> = createEntityAdapter<Controller>({
  selectId: selectUserId,
  sortComparer: sortById,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  // selectedControllerId: null,
});

const ControllerReducer = createReducer(
  initialState,
  on(ControllerActions.addController, (state, { Controller }) => {
    console.log("addController");
    return adapter.addOne(Controller, state)
  }),
  on(ControllerActions.setController, (state, { Controller }) => {
    return adapter.setOne(Controller, state)
  }),
  on(ControllerActions.upsertController, (state, { Controller }) => {
    return adapter.upsertOne(Controller, state);
  }),
  on(ControllerActions.addControllers, (state, { Controllers }) => {
    return adapter.addMany(Controllers, state);
  }),
  on(ControllerActions.upsertControllers, (state, { Controllers }) => {
    return adapter.upsertMany(Controllers, state);
  }),
  on(ControllerActions.updateController, (state, { Controller }) => {
    return adapter.updateOne(Controller, state);
  }),
  on(ControllerActions.updateControllers, (state, { Controllers }) => {
    return adapter.updateMany(Controllers, state);
  }),
  on(ControllerActions.mapControllers, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(ControllerActions.deleteController, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ControllerActions.deleteControllers, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ControllerActions.deleteControllersByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(ControllerActions.loadControllers, (state, { Controllers }) => {
    return adapter.addAll(Controllers, state);
  }),
  on(ControllerActions.clearControllers, state => {
    return adapter.removeAll({ ...state, selectedControllerId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return ControllerReducer(state, action);
}

// export const getSelectedControllerId = (state: State) => state.selectedControllerId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Controller ids
export const selectControllerIds = selectIds;

// select the dictionary of Controller entities
export const selectControllerEntities = selectEntities;

// select the array of Controllers
export const selectAllControllers = selectAll;

// select the total Controller count
export const selectControllerTotal = selectTotal;