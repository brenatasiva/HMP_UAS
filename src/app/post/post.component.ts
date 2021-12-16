/* eslint-disable eqeqeq */
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  username = '';
  statusMessage = 'Oops! There is no posts from the timeline.';
  posts = [];
  status = [];
  collection = [];

  constructor(
    public ps: PostService,
    public cs: CollectionService,
    private storage: Storage,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.listPosts();
  }

  listPosts() {
    this.ps.showPost(this.username).subscribe((data) => {
      this.posts = data.data;
      this.posts.forEach((post) => {
        this.status[post.idpost] = post.status;
      });
      console.log(data.data);
    });
  }

  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + ' ...Show More'
      : string;
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

  save() {}

  unsave() {}
}
