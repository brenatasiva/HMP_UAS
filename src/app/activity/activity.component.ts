import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  username = '';

  activity = [];

  constructor(public u: UserService, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.showActivity();
  }

  showActivity() {
    this.u.showActivity(this.username).subscribe(
      (data) => {
        this.activity = data.data;
        console.log(this.activity);
      }
    );
  }

}
