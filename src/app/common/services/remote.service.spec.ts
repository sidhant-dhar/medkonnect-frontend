import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RemoteService } from './remote.service';

describe('RemoteService', () => {
  let httpTestingControler: HttpTestingController;
  let remote: RemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        RemoteService
      ]
    });
    httpTestingControler = TestBed.get(HttpTestingController);
    remote = TestBed.get(RemoteService);
  });

  afterEach(() => {
    httpTestingControler.verify();
  });

  it('should be created', () => {
    const service: RemoteService = TestBed.get(RemoteService);
    expect(service).toBeTruthy();
  });

  it('should make a remote get call', () => {
    remote.get('http://remote-get/call/data', null).subscribe((res) => {
      expect(res).toBeDefined();
    });

    const httpRequest = httpTestingControler.expectOne('http://remote-get/call/data');
    expect(httpRequest.request.method).toBe('GET');
  });

  it('should make a remote post call', () => {
    remote.post('http://remote-post/call/data', {}, null).subscribe((res) => {
      expect(res).toBeDefined();
    });

    const httpRequest = httpTestingControler.expectOne('http://remote-post/call/data');
    expect(httpRequest.request.method).toBe('POST');
  });
});
