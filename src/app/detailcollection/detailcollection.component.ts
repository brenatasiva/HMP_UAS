import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailcollection',
  templateUrl: './detailcollection.component.html',
  styleUrls: ['./detailcollection.component.scss'],
})
export class DetailcollectionComponent implements OnInit {
  posts = [];
  status = [];
  nama_collection = '';
  pembuat = '';
  username = '';
  idcollection = 0;

  constructor(
    public c: CollectionService,
    public route: ActivatedRoute,
    public ps: PostService,
    private storage: Storage
  ) {}

  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + ' ...Show More'
      : string;
  }

  async ngOnInit() {
    this.idcollection = this.route.snapshot.params.idcollection;
    this.detailCollection(this.idcollection);

    await this.storage.create();
    this.username = await this.storage.get('username');
  }

  like(id: number) {
    this.ps.insertAction('Like', null, id, this.username).subscribe((data) => {
      if (data.result == 'success') {
        this.status[id] = 'liked';
      } else {
        console.log(data.message);
      }
    });
  }

  unlike(id: number) {
    this.ps.deleteAction('Like', id, this.username, null).subscribe((data) => {
      if (data.result == 'success') {
        this.status[id] = '';
      } else {
        console.log(data.message);
      }
    });
  }

  removePost(idpost: number) {
    this.c.deletePostCollection(this.idcollection, idpost).subscribe((data) => {
      if (data.result == 'success') {
        alert('Successfully deleting post from the collection.');
        this.detailCollection(this.idcollection);
      } else {
        alert('Fail to delete post from the collection.');
        console.log(data.message);
      }
    });
  }

  detailCollection(id) {
    this.c.detailCollection(id).subscribe((data) => {
      this.posts = data.data;
      console.log(this.posts);
      this.nama_collection =
        this.posts[0] != null ? this.posts[0].nama_collection : null;
      this.pembuat = this.posts[0] != null ? this.posts[0].pembuat : null;
      this.posts.forEach((post) => {
        this.status[post.idpost] = post.status;
      });
    });
  }
}
