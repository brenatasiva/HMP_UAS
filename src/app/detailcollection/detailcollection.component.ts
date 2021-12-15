import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { PostModel } from '../post.model';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailcollection',
  templateUrl: './detailcollection.component.html',
  styleUrls: ['./detailcollection.component.scss'],
})
export class DetailcollectionComponent implements OnInit {
  posts = [];
  // constructor(public ps:ProductService, public route:ActivatedRoute) { }
  constructor(public c: CollectionService, public route: ActivatedRoute) {}

  ngOnInit() {
    const id: number = this.route.snapshot.params.idcollection;
    this.detailCollection(id);
  }

  detailCollection(id) {
    console.log(id);
    this.c.detailCollection(id).subscribe((data) => {
      this.posts = data.data;
      console.log(data);
    });
  }
}
