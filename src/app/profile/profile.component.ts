import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username = '';

  profile = [];

  constructor(public u: UserService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.showProfile();
  }

  showProfile() {
    this.u.showProfile(this.username).subscribe(
      (data) => {
        this.profile = data.data;
        console.log(this.profile);
      }
    );
  }


}
