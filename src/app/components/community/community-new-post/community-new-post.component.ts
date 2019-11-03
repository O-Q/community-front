import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-new-post',
  templateUrl: './community-new-post.component.html',
  styleUrls: ['./community-new-post.component.scss']
})
export class CommunityNewPostComponent implements OnInit {
  groupName: string;
  // editor = ClassicEditor;
  // content = '';
  // config = {
  //   placeholder: 'چیزی بنویسید...',
  //   autosave: {
  //     waitingTime: 4000, // after afk time in ms
  //     save: editor => this.saveData(editor.getData())
  //   }
  // not need maybe with interceptor for auth token and upload url in building ckeditor
  // simpleUpload: {
  //   uploadUrl: 'http://localhost:3000/image/uploadddd',
  //   headers: {
  //     Authorization: 'Bearer <JSON Web Token>'
  //   }
  // }
  // };
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.groupName = this.route.snapshot.url[0].path;
  }
  changeCommunity(value: string) {
    this.groupName = value;
    this.router.navigate(['c', value, 'new']);
  }
  // TODO: autosave
  saveData(data) {
    if (data) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Saved', data);
          resolve();
        }, 2000);
      });
    } else {
      console.log('nothing to save!');
    }
  }
}
