import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.scss']
})
export class GifsListComponent implements OnInit {
  @Input() list:any

  constructor() { }

  ngOnInit(): void {
  }

}
