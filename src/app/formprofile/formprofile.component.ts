import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserModel } from '../user.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formprofile',
  templateUrl: './formprofile.component.html',
  styleUrls: ['./formprofile.component.scss'],
})
export class FormprofileComponent implements OnInit {
  nama = '';
  gender = '';
  lokasi = '';
  password = '';
  bio = '';
  tanggal_lahir = '';
  email = '';
  url = '';
  username = '';
  constructor(
    public us: UserService,
    public route: ActivatedRoute,
    public camera: Camera,
    public alertController: AlertController,
    public router: Router
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information!',
      subHeader: 'Success',
      message: 'Edit profile success!',
      buttons: [
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.router.navigate(['/profile/' + this.username]);
            console.log(this.username);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.us.showProfile(this.username).subscribe((data) => {
      console.log(data);
      var arrdata = data.data;
      this.nama = arrdata['nama'];
      this.lokasi = arrdata['lokasi'];
      this.gender = arrdata['gender'];
      this.password = arrdata['password'];
      this.bio = arrdata['bio'];
      this.email = arrdata['email'];
      this.tanggal_lahir = arrdata['tanggal_lahir'];
      if (arrdata['url'] == null) {
        this.url = '';
      }
      else{
        this.url = "https://ubaya.fun/hybrid/160419144/hmp_uas/users/images/"+arrdata['url'];
      }
    });
  }
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, //bisa diganti PHOTOLIBRARY jika ingin mengambil foto dari gallery
    saveToPhotoAlbum: true,
  };

  ambilFoto() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.url = base64Image;
      },
      (err) => {
        //kalau error
        alert('Fail to retrieve the photo. Please try again.');
      }
    );
  }

  edit() {
    this.us
      .editProfile(
        // console.log(
        this.username,
        this.password,
        this.nama,
        this.gender,
        this.tanggal_lahir,
        this.email,
        this.lokasi,
        this.bio,
        this.url
        // );
      )
      .subscribe((data) => {
        if (data.result == 'success') {
          this.presentAlert();
        } else {
          this.presentAlertConfirm(data.message);
        }
      });
  }
}
