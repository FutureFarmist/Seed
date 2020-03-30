import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FieldActions from './field.action';
import { Field } from '../../models';

export interface State extends EntityState<Field> {
  // additional entities state properties
  selectedFieldId: number | null;
}
export function selectFieldId(device: Field): string {
  //In this case this would be optional since primary key is id
  return device.Id;
};
export function sortByName(a: Field, b: Field): number {
  return a.Id.localeCompare(b.Id);
}
export const adapter: EntityAdapter<Field> = createEntityAdapter<Field>({
         selectId: selectFieldId,
         sortComparer: sortByName
       });

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedFieldId: null,
});

const FieldReducer = createReducer(
  initialState,
  on(FieldActions.addField, (state, { Field }) => {
    return adapter.addOne(Field, state)
  }),
  on(FieldActions.setField, (state, { Field }) => {
    return adapter.setOne(Field, state)
  }),
  on(FieldActions.upsertField, (state, { Field }) => {
    return adapter.upsertOne(Field, state);
  }),
  on(FieldActions.addFields, (state, { Fields }) => {
    return adapter.addMany(Fields, state);
  }),
  on(FieldActions.upsertFields, (state, { Fields }) => {
    return adapter.upsertMany(Fields, state);
  }),
  on(FieldActions.updateField, (state, { Field }) => {
    return adapter.updateOne(Field, state);
  }),
  on(FieldActions.updateFields, (state, { Fields }) => {
    return adapter.updateMany(Fields, state);
  }),
  on(FieldActions.mapFields, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(FieldActions.deleteField, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(FieldActions.deleteFields, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(FieldActions.deleteFieldsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(FieldActions.loadFields, (state, { Fields }) => {
    return adapter.addAll(Fields, state);
  }),
  on(FieldActions.clearFields, state => {
    return adapter.removeAll({ ...state, selectedFieldId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return FieldReducer(state, action);
}

export const getSelectedFieldId = (state: State) => state.selectedFieldId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Field ids
export const selectFieldIds = selectIds;

// select the dictionary of Field entities
export const selectFieldEntities = selectEntities;

// select the array of Fields
export const selectAllFields = selectAll;

// select the total Field count
export const selectFieldTotal = selectTotal;