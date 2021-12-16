/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  username = '';
  name = '';

  signUp = '';

  loginUsername = '';
  loginPassword = '';
  statusLogin = '';

  signName = '';
  signUsername = '';
  signPassword = '';
  signGender = 'Laki';
  signTanggal = '';
  signEmail = '';
  signLokasi = '';
  signBio = '';
  statusSignUp = '';

  changeSignUp() {
    this.signUp = 'signUp';
  }

  changeSignIn() {
    this.signUp = '';
  }

  constructor(
    private storage: Storage,
    public u: UserService,
    public camera: Camera
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
  }

  login() {
    this.u.login(this.loginUsername, this.loginPassword).subscribe((data) => {
      if (data.result === 'success') {
        this.username = this.loginUsername;
        this.storage.set('username', this.username);
        this.loginPassword = '';
        this.loginUsername = '';
        this.statusLogin = '';
      } else {
        this.statusLogin = data.message;
      }
    });
  }

  signup() {
    if (
      this.signUsername.length > 0 &&
      this.signPassword.length > 0 &&
      this.signGender.length > 0 &&
      this.signTanggal.length > 0 &&
      this.signEmail.length > 0
    ) {
      let user: UserModel = new UserModel(
        this.signUsername,
        this.signName,
        this.signGender,
        this.signPassword,
        this.signTanggal,
        this.signEmail,
        this.signLokasi,
        this.signBio
      );
      this.u.signUp(user).subscribe((data) => {
        if (data.result === 'success') {
          alert('Successfully signed up your account!');
          this.signName = '';
          this.signUsername = '';
          this.signPassword = '';
          this.signGender = 'Laki';
          this.signTanggal = '';
          this.signEmail = '';
          this.signLokasi = '';
          this.signBio = '';
          this.statusSignUp = '';
          this.signUp = '';
        } else {
          this.statusSignUp = data.message;
        }
      });
    } else {
      this.statusSignUp = "You haven't finished filling the form yet.";
    }
  }

  async logout() {
    await this.storage.remove('username');
    if (!(await this.storage.get('username'))) {
      this.username = '';
    }
  }
}
