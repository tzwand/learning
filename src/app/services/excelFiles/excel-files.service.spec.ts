import { TestBed } from '@angular/core/testing';

import { ExcelFilesService } from './excel-files.service';

describe('ExcelFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelFilesService = TestBed.get(ExcelFilesService);
    expect(service).toBeTruthy();
  });
});
