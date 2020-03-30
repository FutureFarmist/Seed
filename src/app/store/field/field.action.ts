import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
import { Field } from '../../models';

export const loadFields = createAction('[Field/API] Load Fields', props<{ Fields: Field[] }>());
export const addField = createAction('[Field/API] Add Field', props<{ Field: Field }>());
export const setField = createAction('[Field/API] Set Field', props<{ Field: Field }>());
export const upsertField = createAction('[Field/API] Upsert Field', props<{ Field: Field }>());
export const addFields = createAction('[Field/API] Add Fields', props<{ Fields: Field[] }>());
export const upsertFields = createAction('[Field/API] Upsert Fields', props<{ Fields: Field[] }>());
export const updateField = createAction('[Field/API] Update Field', props<{ Field: Update<Field> }>());
export const updateFields = createAction('[Field/API] Update Fields', props<{ Fields: Update<Field>[] }>());
export const mapFields = createAction('[Field/API] Map Fields', props<{ entityMap: EntityMap<Field> }>());
export const deleteField = createAction('[Field/API] Delete Field', props<{ id: string }>());
export const deleteFields = createAction('[Field/API] Delete Fields', props<{ ids: string[] }>());
export const deleteFieldsByPredicate = createAction('[Field/API] Delete Fields By Predicate', props<{ predicate: Predicate<Field> }>());
export const clearFields = createAction('[Field/API] Clear Fields');