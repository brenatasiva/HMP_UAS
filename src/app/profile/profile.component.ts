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

  post = 'unhide'
  following = 'hide'
  followers = 'hide'

  hideElmt(hide) {
    // this.post = 'hide'
    if (hide == 'post') {
      this.post = 'unhide'
      this.following = 'hide'
      this.followers = 'hide'
    }
    else if (hide == 'following') {
      this.following = 'unhide'
      this.followers = 'hide'
      this.post = 'hide'
    }
    else if(hide == 'followers') {
      this.followers = 'unhide'
      this.following = 'hide' 
      this.post = 'hide'
    }
  }

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
