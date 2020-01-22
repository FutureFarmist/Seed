import { TestBed } from '@angular/core/testing';

import { NaasService } from './naas.service';

describe('NaasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaasService = TestBed.get(NaasService);
    expect(service).toBeTruthy();
  });
});
