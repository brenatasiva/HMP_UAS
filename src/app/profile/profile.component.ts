/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';
import { PostService } from '../post.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username = '';
  user = '';

  profile = [];
  post = 'unhide';
  following = 'hide';
  followers = 'hide';

  doesFollowThem = false;

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
    private storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.user = await this.storage.get('username');
    this.username = this.route.snapshot.params.username;
    this.showProfile();
  }

  showProfile() {
    this.u.showProfile(this.username).subscribe((data) => {
      this.profile = data.data;
      this.profile['posts'].forEach((post) => {
        this.status[post.idpost] = post.status;
      });
      console.log(this.profile['followers']);
      console.log(this.profile['following']);
      if (this.user !== this.username) {
        if (
          this.profile['followers'].some((item) => item.username === this.user)
        ) {
          this.doesFollowThem = true;
        } else {
          this.doesFollowThem = false;
        }
      }
    });
  }

  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + ' ...Show More'
      : string;
  }

  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
            this.ps.deletePost(id).subscribe((data) => {
              if (data.result == 'success') {
                this.presentAlert();
                this.showProfile();
              } else {
                console.log(data.message);
              }
            });
          },
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/editpost/' + id]);
            console.log('/editpost/' + id);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information!',
      message: 'Berhasil hapus post!',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  like(id: number) {
    this.ps.insertAction('Like', null, id, this.username).subscribe((data) => {
      if (data.result == 'success') {
        this.status[id] = 'liked';
      } else {
        console.log(data.message);
      }
    });
  }

  unlike(id: number) {
    this.ps.deleteAction('Like', id, this.username, null).subscribe((data) => {
      if (data.result == 'success') {
        this.status[id] = '';
      } else {
        console.log(data.message);
      }
    });
  }

  follow() {
    this.u.follow(this.user, this.username, 0).subscribe((data) => {
      if (data.result == 'success') {
        this.showProfile();
      } else {
        alert(data.message);
      }
    });
  }

  unfollow() {
    this.u.unfollow(this.user, this.username).subscribe((data) => {
      if (data.result == 'success') {
        this.showProfile();
      } else {
        alert(data.message);
      }
    });
  }
}
