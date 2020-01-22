import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NaasService } from '../../services/naas.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

interface Pin {
  Pin: number
  Status: boolean
}

@Component({
  selector: 'pins',
  template: `
  <div *ngFor="let pin of pinsState$ | async" >
    <mat-slide-toggle
    (change)="togglePin(pin.Pin)"
    [checked]="pin.Status">{{pin.Pin}}</mat-slide-toggle>
  </div>
  `,
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  pins: Array<Pin> = [];
  pinsState$: BehaviorSubject<Array<Pin>> = new BehaviorSubject<Array<Pin>>([]);
  
  constructor(private naas: NaasService) { }

  ngOnInit() {
    this.pins.push({Pin: 1, Status: false});
    this.pins.push({Pin: 2, Status: false});
    this.pins.push({Pin: 3, Status: false});
    this.pins.push({Pin: 4, Status: false});
    this.pins.push({Pin: 5, Status: false});
    // this.pins.push({Pin: 6, Status: false}); 
    this.pins.push({Pin: 7, Status: false});
    this.pins.push({Pin: 8, Status: false});
    // this.pins.push({Pin: 9, Status: false});
    this.pins.push({Pin: 10, Status: false});
    this.pins.push({Pin: 11, Status: false});
    this.pins.push({Pin: 12, Status: false});
    this.pins.push({Pin: 13, Status: false});
    // this.pins.push({Pin: 14, Status: false}); 
    this.pins.push({Pin: 15, Status: false});
    this.pins.push({Pin: 16, Status: false});
    this.pins.push({Pin: 17, Status: false});
    this.pins.push({Pin: 18, Status: false});
    this.pins.push({Pin: 19, Status: false});
    // this.pins.push({Pin: 20, Status: false});
    this.pins.push({Pin: 21, Status: false});
    this.pins.push({Pin: 22, Status: false});
    this.pins.push({Pin: 23, Status: false});
    this.pins.push({Pin: 24, Status: false});
    // this.pins.push({Pin: 25, Status: false});
    this.pins.push({Pin: 26, Status: false});
    this.pins.push({Pin: 27, Status: false});
    this.pins.push({Pin: 28, Status: false});
    this.pins.push({Pin: 29, Status: false});
    // this.pins.push({Pin: 30, Status: false});
    this.pins.push({Pin: 31, Status: false});
    this.pins.push({Pin: 32, Status: false});
    this.pins.push({Pin: 33, Status: false});
    // this.pins.push({Pin: 34, Status: false});
    this.pins.push({Pin: 35, Status: false});
    this.pins.push({Pin: 36, Status: false});
    this.pins.push({Pin: 37, Status: false});
    this.pins.push({Pin: 38, Status: false});
    // this.pins.push({Pin: 39, Status: false});
    this.pins.push({Pin: 40, Status: false});
    this.pinsState$.next(this.pins);
    console.log('pin');
  }

  togglePin(pinNo: number) {
    
    if (pinNo > 0) {
      for (let pin of this.pins) {
        if (pin.Pin === pinNo) {
          if (pin.Status) {
            this.naas.pinOff(pin.Pin).subscribe();
            // this.naas.pinOff(pin.Pin).subscribe(this.handlePinsState);
            break;
          } else {
            this.naas.pinOn(pin.Pin).subscribe();
            // this.naas.pinOn(pin.Pin).subscribe(this.handlePinsState);
            break;
          }
        }
      }
    } 
    
  }
  
  handlePinsState(pinsState: string) {
    if (pinsState) {
      console.log("handlePinsState");
      let ps = JSON.parse(pinsState);
      let pins: Pin[] = [];
      
      // push to pinsState$
      this.pinsState$.next(pins); 
    }
  }
  
}
