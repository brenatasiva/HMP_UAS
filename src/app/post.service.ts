//Decorator agar component lain bisa memanggil/mengakses servis ini
import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) { }
  showPost(username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/showpost.php', body);
  }

  insertPost(post: PostModel): Observable<any> {
    let body = new HttpParams();
    body = body.set('caption', post.caption);
    body = body.set('username', post.username);
    body = body.set('date', post.date);
    body = body.set('url', post.url);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/insertpost.php', body);
  }

  detailPost(idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/detailpost.php', body);
  }

  deletePost(idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/deletepost.php', body);
  }

  editPost(idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idpost', idpost);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/editpost.php', body);
  }

  insertAction(action: string, date: string, comment: string, idpost: number, username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('action', action);
    body = body.set('date', date);
    body = body.set('comment', comment);
    body = body.set('idpost', idpost);
    body = body.set('username', username);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/insertaction.php', body);
  }

  deleteAction(action: string, idpost: number, username: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('action', action);
    body = body.set('idpost', idpost);
    body = body.set('username', username);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/posts/deleteaction.php', body);
  }
}
