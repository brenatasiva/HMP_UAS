import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-collectionpicker',
  templateUrl: './collectionpicker.component.html',
  styleUrls: ['./collectionpicker.component.scss'],
})
export class CollectionpickerComponent implements OnInit {
  username = '';
  collection = [];
  idpost = 0;

  constructor(
    public cs: CollectionService,
    private storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.idpost = this.route.snapshot.params.id;
    this.listCollection(this.idpost);
  }

  listCollection(idpost: number) {
    this.cs.getCollection(idpost, this.username).subscribe((data) => {
      console.log(data.data);
      this.collection = data.data;
    });
  }

  addToCollection(idcollection: number) {
    this.cs
      .insertPostCollection(idcollection, this.idpost)
      .subscribe((data) => {
        if (data.result == 'success') {
          this.presentAlert();
          this.router.navigate(['/home']);
        } else {
          alert('Gagal menambahkan post ke collection');
          console.log(data.message);
        }
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information!',
      subHeader: 'Success',
      message: 'Berhasil menambahkan post ke collection',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
