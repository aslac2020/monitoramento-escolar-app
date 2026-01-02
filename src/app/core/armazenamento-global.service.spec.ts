import { TestBed } from '@angular/core/testing';

import { ArmazenamentoGlobalService } from './armazenamento-global.service';

describe('ArmazenamentoGlobalService', () => {
  let service: ArmazenamentoGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmazenamentoGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
