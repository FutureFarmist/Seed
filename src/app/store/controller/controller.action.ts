import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
import { Controller } from '../../models';

export const loadControllers = createAction('[Controller/API] Load Controllers', props<{ Controllers: Controller[] }>());
export const addController = createAction('[Controller/API] Add Controller', props<{ Controller: Controller }>());
export const setController = createAction('[Controller/API] Set Controller', props<{ Controller: Controller }>());
export const upsertController = createAction('[Controller/API] Upsert Controller', props<{ Controller: Controller }>());
export const addControllers = createAction('[Controller/API] Add Controllers', props<{ Controllers: Controller[] }>());
export const upsertControllers = createAction('[Controller/API] Upsert Controllers', props<{ Controllers: Controller[] }>());
export const updateController = createAction('[Controller/API] Update Controller', props<{ Controller: Update<Controller> }>());
export const updateControllers = createAction('[Controller/API] Update Controllers', props<{ Controllers: Update<Controller>[] }>());
export const mapControllers = createAction('[Controller/API] Map Controllers', props<{ entityMap: EntityMap<Controller> }>());
export const deleteController = createAction('[Controller/API] Delete Controller', props<{ id: string }>());
export const deleteControllers = createAction('[Controller/API] Delete Controllers', props<{ ids: string[] }>());
export const deleteControllersByPredicate = createAction('[Controller/API] Delete Controllers By Predicate', props<{ predicate: Predicate<Controller> }>());
export const clearControllers = createAction('[Controller/API] Clear Controllers');