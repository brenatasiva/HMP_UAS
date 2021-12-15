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
  // @Input() posts: any;

  username = '';
  statusMessage = 'Oops! There is no posts from the timeline.';
  data = '';

  posts: PostModel[] = [];

  constructor(public ps: PostService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    console.log(this.username);
    this.listPosts();
  }

  listPosts() {
    this.ps.showPost(this.username).subscribe(
      (data) => {
        data = data;
        console.log(data);
      }
    );
  }

}
