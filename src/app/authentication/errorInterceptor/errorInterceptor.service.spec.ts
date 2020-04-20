import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorService } from './errorInterceptor.service';

describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorInterceptorService = TestBed.get(ErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
