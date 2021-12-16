//Decorator agar component lain bisa memanggil/mengakses servis ini
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  showProfile(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/showprofile.php',
      body
    );
  }

  getProfile(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/getprofile.php',
      body
    );
  }

  signUp(user: UserModel, url: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', user.username);
    body = body.set('nama', user.nama);
    body = body.set('gender', user.gender);
    body = body.set('password', user.password);
    body = body.set('tanggalLahir', user.tanggalLahir);
    body = body.set('email', user.email);
    body = body.set('lokasi', user.lokasi);
    body = body.set('bio', user.bio);
    body = body.set('url', url);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/signup.php',
      body
    );
  }

  login(username, password): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/login.php',
      body
    );
  }

  follow(username: string, follow: string, muted: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('follow', follow);
    body = body.set('muted', 0);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/follow.php',
      body
    );
  }

  unfollow(username: string, follow: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('follow', follow);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/unfollow.php',
      body
    );
  }

  showActivity(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/showactivity.php',
      body
    );
  }

  muteOrUnmute(
    username: string,
    follow: number,
    type: string
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('follow', follow);
    body = body.set('type', type);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/mute_unmute.php',
      body
    );
  }

  editProfile(
    username: string,
    password: string,
    nama: string,
    gender: string,
    tanggal_lahir: string,
    email: string,
    lokasi: string,
    bio: string,
    url: string
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    body = body.set('nama', nama);
    body = body.set('gender', gender);
    body = body.set('tanggal_lahir', tanggal_lahir);
    body = body.set('email', email);
    body = body.set('lokasi', lokasi);
    body = body.set('bio', bio);
    body = body.set('url', url);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/users/editprofile.php',
      body
    );
  }
}
