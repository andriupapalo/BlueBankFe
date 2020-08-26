import { TestBed } from '@angular/core/testing';

import { ClientesdataService } from './clientesdata.service';

describe('ClientesdataService', () => {
  let service: ClientesdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
