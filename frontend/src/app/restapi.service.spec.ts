import { TestBed, inject } from '@angular/core/testing';
import { RestapiService } from './restapi.service';

describe('RestapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestapiService]
    });
  });

  it('should be created', inject([RestapiService], (service: RestapiService) => {
    expect(service).toBeTruthy();
  }));
});
