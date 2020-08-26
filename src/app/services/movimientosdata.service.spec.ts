import { TestBed } from '@angular/core/testing';

import { MovimientosdataService } from './movimientosdata.service';

describe('MovimientosdataService', () => {
  let service: MovimientosdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientosdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
