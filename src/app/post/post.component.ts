import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  username = '';
  statusMessage = 'Oops! There is no posts from the timeline.';
  posts = [];

  constructor(public ps: PostService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.listPosts();
  }

  listPosts() {
    this.ps.showPost(this.username).subscribe(
      (data) => {
        this.posts = data.data;
        console.log(data.data);
      }
    );
  }

}
