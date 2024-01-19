import { TestBed } from '@angular/core/testing';

import { CounterServiceService } from './counter-service.service';

describe('CounterServiceService', () => {
  let service: CounterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
