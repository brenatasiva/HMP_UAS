/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-formpost',
  templateUrl: './formpost.component.html',
  styleUrls: ['./formpost.component.scss'],
})
export class FormpostComponent implements OnInit {
  username = '';
  caption = '';
  url = '';
  disabled = true;
  postUrl = '';

  checkCaption(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.value !== '') {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  addPost() {
    this.ps.insertPost(this.caption, this.username, this.url).subscribe(
      (data) => {
        alert(data.status);
      }
    );
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA, //bisa diganti PHOTOLIBRARY jika ingin mengambil foto dari gallery
    saveToPhotoAlbum: true
  };

  ambilFoto() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.postUrl = base64Image;
      },
      (err) => {
        //kalau error
        alert('Fail to retrieve the photo. Please try again.');
      }
    );
  }


  constructor(public ps: PostService, public router: Router, private storage: Storage, public camera: Camera) { }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
  }

}
