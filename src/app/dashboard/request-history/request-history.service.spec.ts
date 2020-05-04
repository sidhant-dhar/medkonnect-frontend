import { TestBed } from '@angular/core/testing';

import { RequestHistoryService } from './request-history.service';

describe('RequestHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestHistoryService = TestBed.get(RequestHistoryService);
    expect(service).toBeTruthy();
  });
});
