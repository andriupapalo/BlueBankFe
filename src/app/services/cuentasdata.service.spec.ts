import { TestBed } from '@angular/core/testing';

import { CuentasdataService } from './cuentasdata.service';

describe('CuentasdataService', () => {
  let service: CuentasdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
