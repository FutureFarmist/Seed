import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
import { Plant } from '../../models';

export const loadPlants = createAction('[Plant/API] Load Plants', props<{ Plants: Plant[] }>());
export const addPlant = createAction('[Plant/API] Add Plant', props<{ Plant: Plant }>());
export const setPlant = createAction('[Plant/API] Set Plant', props<{ Plant: Plant }>());
export const upsertPlant = createAction('[Plant/API] Upsert Plant', props<{ Plant: Plant }>());
export const addPlants = createAction('[Plant/API] Add Plants', props<{ Plants: Plant[] }>());
export const upsertPlants = createAction('[Plant/API] Upsert Plants', props<{ Plants: Plant[] }>());
export const updatePlant = createAction('[Plant/API] Update Plant', props<{ Plant: Update<Plant> }>());
export const updatePlants = createAction('[Plant/API] Update Plants', props<{ Plants: Update<Plant>[] }>());
export const mapPlants = createAction('[Plant/API] Map Plants', props<{ entityMap: EntityMap<Plant> }>());
export const deletePlant = createAction('[Plant/API] Delete Plant', props<{ id: string }>());
export const deletePlants = createAction('[Plant/API] Delete Plants', props<{ ids: string[] }>());
export const deletePlantsByPredicate = createAction('[Plant/API] Delete Plants By Predicate', props<{ predicate: Predicate<Plant> }>());
export const clearPlants = createAction('[Plant/API] Clear Plants');