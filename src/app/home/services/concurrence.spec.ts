import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { ConcurrenceService } from './concurrence.service';

describe('ConcurrenceService', () => {
  let service: ConcurrenceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConcurrenceService],
    });
    service = TestBed.inject(ConcurrenceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should make requests in blocks of MAX_CONCURRENCY URLs ', async () => {
    spyOn(service, 'getGifsByValue').and.callThrough();
    const testValues = [
      'value1',
      'value2',
      'value3',
      'value4',
      'value5',
      'value6',
      'value7',
    ];

    const MAX_CONCURRENCY = service.MAX_CONCURRENCY;
    const totalValues = testValues.length;

    const totalBlocks = Math.ceil(totalValues / MAX_CONCURRENCY);

    let responsesCont = 0;

    // Simulate the expected number of blocks
    for (let blockIndex = 0; blockIndex < totalBlocks; blockIndex++) {
      const chunkPromises = [];

      // Process each block of values
      for (let i = 0; i < MAX_CONCURRENCY; i++) {
        const value = testValues.shift(); // Remove the value from the array
        if (value) {
          chunkPromises.push(service.getGifsByValue(value));
        }
      }

      const chunkResponses = await Promise.all(chunkPromises);
      responsesCont += chunkResponses.length;

    }

    //Check length of requests
    expect(service.getGifsByValue).toHaveBeenCalledTimes(totalValues);

    // Check length of the responses array
    expect(responsesCont).toEqual(totalValues);
   

    // Check the number of blocks
    expect(totalBlocks).toEqual(Math.ceil(totalValues / MAX_CONCURRENCY));

  });

});
