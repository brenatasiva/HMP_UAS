//Decorator agar component lain bisa memanggil/mengakses servis ini
import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  showPost(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/showpost.php',
      body
    );
  }

  getPost(idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/getpost.php',
      body
    );
  }

  insertPost(caption: string, username: string, url: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('caption', caption);
    body = body.set('username', username);
    body = body.set('url', url);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/insertpost.php',
      body
    );
  }

  detailPost(idpost: number, username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/detailpost.php',
      body
    );
  }

  deletePost(idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/deletepost.php',
      body
    );
  }

  editPost(idpost: number, caption: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    body = body.set('caption', caption);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/editpost.php',
      body
    );
  }

  insertAction(
    action: string,
    comment: string,
    idpost: number,
    username: string
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('action', action);
    body = body.set('comment', comment);
    body = body.set('idpost', idpost);
    body = body.set('username', username);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/insertaction.php',
      body
    );
  }

  deleteAction(
    action: string,
    idpost: number,
    username: string,
    idaction: number
  ): Observable<any> {
    let body = new HttpParams();
    body = body.set('type', action);
    body = body.set('idpost', idpost);
    body = body.set('username', username);
    body = body.set('idaction', idaction);
    return this.http.post(
      'https://ubaya.fun/hybrid/160419144/hmp_uas/posts/deleteaction.php',
      body
    );
  }
}
