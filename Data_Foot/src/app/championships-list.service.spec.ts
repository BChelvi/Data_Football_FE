import { TestBed } from '@angular/core/testing';

import { ChampionshipsListService } from './championships-list.service';

describe('ChampionshipsListService', () => {
  let service: ChampionshipsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampionshipsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
