import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  collections = [];

  constructor(public c: CollectionService) {}

  ngOnInit() {
    this.showCollections();
  }

  showCollections() {
    this.c.showCollection().subscribe((data) => {
      this.collections = data.data;
      console.log(this.collections);
    });
  }
}
