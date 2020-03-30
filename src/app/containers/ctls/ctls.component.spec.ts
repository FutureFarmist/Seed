import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlsComponent } from './ctls.component';

describe('CtlsComponent', () => {
  let component: CtlsComponent;
  let fixture: ComponentFixture<CtlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
