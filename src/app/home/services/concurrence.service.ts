import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  Observable,
  forkJoin,
  from,
  bufferCount,
  concatMap,
  delay,
  mergeAll,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConcurrenceService {
  private apiUrl: string = environment.url;
  private apiKey: string = environment.key;

  constructor(private http: HttpClient) { }

  public MAX_CONCURRENCY = 2;
  public DELAY = 1000;

  //JS ASYNC:

  public async *getGifsByMultipleValues(values: string[]) {
    for (let i = 0; i < values.length; i += this.MAX_CONCURRENCY) {
      const chunk = values.slice(i, i + this.MAX_CONCURRENCY);
      const chunkPromises = chunk.map((value: string) =>
        this.getGifsByValue(value)
      );

      const chunkResponses = await Promise.all(chunkPromises);

      for (const response of chunkResponses) {
        if (response.meta.status != 200) {
          yield 'error';
        } else {
          yield response;
        }
      }

      //JUST FOR TEST
      // if (i + this.MAX_CONCURRENCY < values.length) {
      //   await new Promise((resolve) => setTimeout(resolve, this.DELAY));
      // }
    }
  }

  public async getGifsByValue(value: string) {
    let response: any;

    response = await fetch(
      `${this.apiUrl}/search?q=${value}&limit=10&api_key=${this.apiKey}`
    );

    return response.json();
  }


  //RXJS:

  // getGifsByMultipleValues(values: string[]): Observable<any[]> {
  //   return from(values).pipe(
  //     bufferCount(this.MAX_CONCURRENCY),
  //     concatMap((valueBlock) => {
  //       const requests: Observable<any>[] = valueBlock.map((value) =>
  //         this.getGifsByValue(value)
  //       );
  //       return forkJoin(requests)
  //       //JUST FOR TEST
  //     .pipe(delay(this.DELAY), mergeAll());
  //     })
  //   );
  // }

  // getGifsByValue(value: string): Observable<any> {
  //   return this.http.get(
  //     `${this.apiUrl}/search?q=${value}&limit=10&api_key=${this.apiKey}`
  //   );
  // }
}
