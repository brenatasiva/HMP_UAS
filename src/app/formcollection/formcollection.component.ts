import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { CollectionModel } from '../collection.model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formcollection',
  templateUrl: './formcollection.component.html',
  styleUrls: ['./formcollection.component.scss'],
})
export class FormcollectionComponent implements OnInit {
  username = '';
  nama_collection = '';
  disabled = true;

  checkCollectionName(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.value !== '') {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  save() {
    let collect: CollectionModel = new CollectionModel(
      0,
      this.nama_collection,
      this.username
    );
    this.c.insertCollection(collect).subscribe((data) => {
      if (data.result == 'success') {
        this.router.navigate(['/collection']);
      }
    });
  }

  constructor(
    public c: CollectionService,
    public router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
  }
}
