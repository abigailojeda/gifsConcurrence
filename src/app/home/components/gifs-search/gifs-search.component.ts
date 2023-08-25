import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gifs-search',
  templateUrl: './gifs-search.component.html',
  styleUrls: ['./gifs-search.component.scss']
})
export class GifsSearchComponent implements OnInit {
  @Input() isLoading:boolean=false
  @Output() getGifs = new EventEmitter<any>();
  @Output() resetList = new EventEmitter<any>();
  public categories: string[] = []
  public category: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  public setCategories() {
    if (this.category != '' && !this.categories.includes(this.category)) {
      this.categories.push(this.category);
    }

    this.category = ''
  }

  public reset(){
    this.categories=[]
    this.resetList.emit()
  }

  public emitGetGifs() {
    this.getGifs.emit(this.categories)
  }
 
}
