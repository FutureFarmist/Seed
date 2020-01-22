/* import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { XActionTypes } from './x.action';

// import { Y } from './x2.action';

@Injectable()
export class XEffects {

    @Effect()
    Y$: Observable<Action> = this.actions$.pipe(
        ofType(XActionTypes.Y),
        map(() => new Y())
    );

    constructor(private actions$: Actions) {}
}
 */
