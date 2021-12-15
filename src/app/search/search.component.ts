import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search = '';

  findUser(event) {
    const element = event.target as HTMLInputElement;
    console.log(element);
  }
  constructor() {}

  ngOnInit() {}
}
