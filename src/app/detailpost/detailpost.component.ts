import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.scss'],
})
export class DetailpostComponent implements OnInit {
  constructor(
    public ps: PostService,
    private storage: Storage,
    public route: ActivatedRoute
  ) {}

  username = '';
  data = [];
  comments = [];
  likes = 0;
  id: number = 0;
  textComment = '';
  status = '';
  url = '';
  usernameUrl = '';

  async ngOnInit() {
    this.id = this.route.snapshot.params.idpost;
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.detailPosts();
  }

  detailPosts() {
    this.ps.detailPost(this.id, this.username).subscribe((data) => {
      this.data = data.data;
      this.likes = data.data.likes;
      this.comments = data.data.comments;
      this.status = data.data.status;
      this.url = data.data.url;
      this.usernameUrl = data.data.usernameUrl;
      console.log(data.data);
    });
  }

  addComment() {
    this.ps
      .insertAction('Comment', this.textComment, this.id, this.username)
      .subscribe((data) => {
        if (data.result == 'success') this.detailPosts();
        else console.log(data.message);
      });
  }

  deleteComment(id: number) {
    this.ps
      .deleteAction('Comment', this.id, this.username, id)
      .subscribe((data) => {
        if (data.result == 'success') this.detailPosts();
        else console.log(data.message);
      });
  }

  like() {
    this.ps
      .insertAction('Like', null, this.id, this.username)
      .subscribe((data) => {
        if (data.result == 'success') this.detailPosts();
        else console.log(data.message);
      });
  }

  unlike() {
    this.ps
      .deleteAction('Like', this.id, this.username, null)
      .subscribe((data) => {
        if (data.result == 'success') this.detailPosts();
        else console.log(data.message);
      });
  }
}
