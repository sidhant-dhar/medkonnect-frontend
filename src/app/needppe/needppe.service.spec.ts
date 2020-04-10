import { TestBed } from '@angular/core/testing';

import { NeedppeService } from './needppe.service';

describe('NeedppeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeedppeService = TestBed.get(NeedppeService);
    expect(service).toBeTruthy();
  });
});
