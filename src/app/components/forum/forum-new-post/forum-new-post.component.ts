import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as BalloonBlockEditor from 'ckeditor-personal-build';


@Component({
  selector: 'app-forum-new-post',
  templateUrl: './forum-new-post.component.html',
  styleUrls: ['./forum-new-post.component.scss']
})
export class ForumNewPostComponent implements OnInit {
  groupName: string;
  editor = BalloonBlockEditor;
  content = '';
  wordsCount = 0;
  config = {
    placeholder: 'چیزی بنویسید...',
    autosave: {
      waitingTime: 4000, // after afk time in ms
      save: editor => this.saveData(editor.getData())
    },
    wordCount: {
      onUpdate: stats => this.wordsCount = stats.words
    }
    // not need maybe with interceptor for auth token and upload url in building ckeditor
    // simpleUpload: {
    //   uploadUrl: 'http://localhost:3000/image/uploadddd',
    //   headers: {
    //     Authorization: 'Bearer <JSON Web Token>'
    // }
    // }
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupName = this.route.snapshot.params.name;
  }
  changeForum(value: string) {
    this.groupName = value;
    this.router.navigate(['c', value, 'new']);
  }
  // TODO: autosave
  saveData(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Saved', data);
        resolve();
      }, 2000);
    });
  }
}
