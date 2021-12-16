import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search = '';
  users = [];

  findUser(event) {
    const element = event.target as HTMLInputElement;
    this.getProfile(element.value);
  }
  constructor(public u: UserService) {}

  ngOnInit() {
    this.getProfile('');
  }

  getProfile(username: string) {
    this.u.getProfile(username).subscribe((data) => {
      this.users = data.data;
    });
  }
}
