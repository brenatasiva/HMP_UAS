import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  collections = [];
  username = '';

  constructor(public c: CollectionService, public storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.showCollections();
  }

  showCollections() {
    this.c.showCollection().subscribe((data) => {
      this.collections = data.data;
    });
  }

  deleteCollection(id: number) {
    this.c.deleteCollection(id).subscribe((data) => {
      if (data.result === 'success') {
        this.showCollections();
      } else {
        alert(data.message);
      }
    });
  }
}
