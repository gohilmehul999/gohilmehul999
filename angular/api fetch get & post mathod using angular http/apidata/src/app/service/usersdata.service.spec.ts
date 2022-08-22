import { TestBed } from '@angular/core/testing';

import { UsersdataService } from './usersdata.service';

describe('UsersdataService', () => {
  let service: UsersdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
