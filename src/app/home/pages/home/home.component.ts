import { Component, OnInit } from '@angular/core';
import { ConcurrenceService } from '../../services/concurrence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private concurrenceService: ConcurrenceService) { }
  //public values = ['cat', 'dog', 'tree', 'duck', 'apple', 'pencil', 'box'];
  public results: any[] = [];
  public isLoading: boolean = false
  public empty: boolean = false

  ngOnInit(): void {

    //RXJS
    // this.concurrenceService.getGifsByMultipleValues(this.values).subscribe({
    //   next: (res: any) => {
    //     const data = res;
    //     console.log(data)
    //   },
    //  });

  }

  public getGifs(categories: string[]) {
    this.isLoading = true
    const generator = this.concurrenceService.getGifsByMultipleValues(categories);

    this.processGenerator(generator);
  }


  async processGenerator(generator: AsyncGenerator) {
    for await (const value of generator) {
      this.results.push(value)
      this.isLoading = false
      this.checkEmpty()
    }

  }

  public reset() {
    this.results = []
  }

  public checkEmpty() {
    this.empty=true
    for (const result of this.results) {
      if (this.results.length > 0 && result.data.length > 0) {
        this.empty = false;
        break;
      }
    }
  }


}
