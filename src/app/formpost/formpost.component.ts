import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'
import { PostModel } from '../post.model'

@Component({
  selector: 'app-formpost',
  templateUrl: './formpost.component.html',
  styleUrls: ['./formpost.component.scss'],
})
export class FormpostComponent implements OnInit {

  caption = ''

  addPost(){
    this.ps.insertPost().subscribe(
      (data) => {
        alert(data['pesan'])
      }
    )
  }

  constructor(public ps:PostService) { }

  ngOnInit() {}

}
