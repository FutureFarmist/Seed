import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camera',
  template: `
  <img *ngIf="imageURI" src="{{imageURI}}" />`,
  styles: ['img { max-width: 100% }']
})
export class CameraComponent implements OnInit {

  URI = 'image.png';
  imageURI = this.URI;
  constructor() { }
/* 
  reloadImage() {
    
  } */

  ngOnInit() {
    setInterval(function() {
      console.log('reloading image');
      this.imageURI = this.URI + '?random+\=' + Math.random();
    }, 10000);
  }

}
