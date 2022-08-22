import { TestBed } from '@angular/core/testing';

import { GoogllSigninService } from './googll-signin.service';

describe('GoogllSigninService', () => {
  let service: GoogllSigninService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogllSigninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
