import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PostModel } from './post.model';
import { UserModel } from './user.model';
import { UserService } from './user.service';

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

  // posts: PostModel[] = [];
  changeSignUp() {
    this.signUp = 'signUp';
  }

  changeSignIn() {
    this.signUp = '';
  }

  constructor(private storage: Storage, public u: UserService) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
  }

  login() {
    this.u.login(this.loginUsername, this.loginPassword).subscribe((data) => {
      if (data.result === 'success') {
        alert('Berhasil login!');
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
    this.u.login(this.loginUsername, this.loginPassword).subscribe((data) => {
      if (data.result === 'success') {
        alert('Berhasil login!');
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

  async logout() {
    await this.storage.remove('username');
    if (!(await this.storage.get('username'))) {
      this.username = '';
      alert('Berhasil logout!');
    }
  }
}
