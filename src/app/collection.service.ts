import { Injectable } from '@angular/core';
import { CollectionModel } from './collection.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private http: HttpClient) { }
  showCollection(): Observable<any> {
    return this.http.get('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/showcollection.php');
  }

  insertCollection(collect: CollectionModel): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', collect.username);
    body = body.set('namaCollection', collect.namaCollection);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/insertcollection.php', body);
  }

  detailCollection(idcollection: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idcollection', idcollection);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/detailcollection.php', body);
  }

  editCollection(collect: CollectionModel): Observable<any> {
    let body = new HttpParams();
    body = body.set('idcollection', collect.idcollection);
    body = body.set('namaCollection', collect.namaCollection);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/editcollection.php', body);
  }

  deleteCollection(idcollection: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idcollection', idcollection);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/deletecollection.php', body);
  }

  insertPostCollection(idcollection: number, idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idcollection', idcollection);
    body = body.set('idpost', idpost);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/insertpostcollection.php', body);
  }

  deletePostCollection(idcollection: number, idpost: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('idcollection', idcollection);
    body = body.set('idpost', idpost);
    return this.http.post('https://ubaya.fun/hybrid/160419144/hmp_uas/collections/deletepostcollection.php', body);
  }
}
