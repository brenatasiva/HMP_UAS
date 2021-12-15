import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';
import { PostService } from '../post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username = '';

  profile = [];
  post = 'unhide';
  following = 'hide';
  followers = 'hide';

<<<<<<< HEAD
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
=======
  status = [];

  hideElmt(hide) {
    if (hide == 'post') {
      this.post = 'unhide';
      this.following = 'hide';
      this.followers = 'hide';
    } else if (hide == 'following') {
      this.following = 'unhide';
      this.followers = 'hide';
      this.post = 'hide';
    } else if (hide == 'followers') {
      this.followers = 'unhide';
      this.following = 'hide';
      this.post = 'hide';
    }
  }

  constructor(
    public ps: PostService,
    public u: UserService,
    private storage: Storage
  ) {}
>>>>>>> 3b73853183f3f76ed69b12a6f5a2bee4b87df9e2

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.showProfile();
  }

  showProfile() {
    this.u.showProfile(this.username).subscribe((data) => {
      this.profile = data.data;
      this.profile['posts'].forEach((post) => {
        this.status[post.idpost] = post.status;
      });
      console.log(this.profile);
    });
  }

  like(id: number) {
    this.ps.insertAction('Like', null, id, this.username).subscribe((data) => {
      if (data.result == 'success') this.status[id] = 'liked';
      else console.log(data.message);
    });
  }

  unlike(id: number) {
    this.ps.deleteAction('Like', id, this.username, null).subscribe((data) => {
      if (data.result == 'success') this.status[id] = '';
      else console.log(data.message);
    });
  }
}
