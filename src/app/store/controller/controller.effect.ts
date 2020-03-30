import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
import { map, mergeMap } from 'rxjs/operators';

import { updateControllers, deleteController } from './controller.action';
import { NaasService } from '../../services/naas.service';

// import { Y } from './x2.action';

@Injectable()
export class ControllerEffects {
  loadMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateControllers || deleteController),
        mergeMap(() => this.naasSv.dbUpdateControllers().pipe(
          map((updateControllersResult) => {
            console.log('updateControllersResult' + updateControllersResult);
          })
        ))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private naasSv: NaasService) {}
}

