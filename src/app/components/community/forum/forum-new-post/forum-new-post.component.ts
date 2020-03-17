import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as BalloonBlockEditor from '../../../../../../libs/ckeditor-personal-build';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CKEDITOR_DEFAULT_CONFIG, CKEDITOR_DEFAULT_CONFIG_AUTO_SAVE } from '../../../../constants/ckeditor.constant';


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
  isXSmall$: Observable<boolean>;
  config = {
    ...CKEDITOR_DEFAULT_CONFIG,
    autosave: {
      ...CKEDITOR_DEFAULT_CONFIG_AUTO_SAVE,
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
  constructor(private router: Router, private route: ActivatedRoute, private bpo: BreakpointObserver) {
    this.isXSmall$ = this.bpo.observe(Breakpoints.XSmall).pipe(map(is => is.matches));
  }

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
