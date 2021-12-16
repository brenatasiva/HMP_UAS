import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  username = '';
  caption = '';
  id: number = 0;
  constructor(
    public storage: Storage,
    public route: ActivatedRoute,
    public ps: PostService,
    public router: Router,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.ps.getPost(this.id).subscribe((data) => {
      this.caption = data.data;
      console.log(data.data);
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information!',
      subHeader: 'Success',
      message: 'Edit post success!',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  editPost() {
    this.ps.editPost(this.id, this.caption).subscribe((data) => {
      if (data.result == 'success') {
        this.presentAlert();
        this.router.navigate(['/profile/' + this.username]);
      } else {
        console.log(data.message);
      }
    });
  }
}
