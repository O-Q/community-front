import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CKEDITOR_DEFAULT_CONFIG, CKEDITOR_DEFAULT_CONFIG_AUTO_SAVE } from '../../../../constants/ckeditor.constant';
import { AppState } from '../../../../store/state';
import { getSelectedSocial } from '../../../../store/user';
import * as BalloonBlockEditor from '../../../../../../libs/ckeditor-personal-build';
import * as PostActions from './../../../../store/post/post.actions';
import { SocialType } from '../../../../models/user.model';



@Component({
  selector: 'app-forum-new-post',
  templateUrl: './forum-new-post.component.html',
  styleUrls: ['./forum-new-post.component.scss']
})
export class ForumNewPostComponent implements OnInit {
  editor = BalloonBlockEditor;
  // selectedSocial = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  subtitle = new FormControl('', []);
  flairs = new FormControl(null, []);
  text = '';
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
  selectedSocial$ = this.store.select(getSelectedSocial);
  user$ = this.store.select('user');
  postId = null;
  socialType: SocialType;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bpo: BreakpointObserver,
    private store: Store<AppState>) {
    this.isXSmall$ = this.bpo.observe(Breakpoints.XSmall).pipe(map(is => is.matches));
    const { name, pid } = this.route.snapshot.params;
    if (pid) { // edit post
      this.store.dispatch(PostActions.PostDetailedFetching({ sname: name, pid }));
      this.store.select('post').pipe(takeWhile((v) => !v.post, true)).subscribe(v => {
        if (v.post) {
          this.text = v.post.text;
          this.title.setValue(v.post.title);
          this.subtitle.setValue(v.post.subtitle);
          this.flairs.setValue(v.post.flairs);
          this.postId = v.post._id;
          this.socialType = v.post.type;
        }
      });

    }

  }

  ngOnInit() {
  }
  changeForum(selected: { name: string, socialType: 'FORUM' | 'BLOG' }) {
    this.router.navigate([selected.socialType === 'FORUM' ? 'c' : 'b', selected.name, 'new']);
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
  onPublish(selectedSocial) {
    console.log(selectedSocial);


    if (this.title.valid && this.wordsCount >= 3) {
      const text = this.text;
      const title = this.title.value;
      const subtitle = this.subtitle.value;
      const flairs = this.flairs.value;

      this.store.dispatch(PostActions.PostPublishing(
        {
          post: { title, subtitle, text, flairs },
          sid: selectedSocial._id,
          sname: selectedSocial.name,
          socialType: this.socialType
        }));
    } else {
      console.log('error');
    }


  }
  onUpdate(selectedSocial) {
    if (this.title.valid && this.wordsCount >= 3) {
      const text = this.text;
      const title = this.title.value;
      const subtitle = this.subtitle.value;
      const flairs = this.flairs.value;
      this.store.dispatch(PostActions.PostUpdating(
        {
          post: {
            title, subtitle, text, flairs, pid: this.postId
          },
          sid: selectedSocial._id,
          sname: selectedSocial.name,
          socialType: this.socialType
        }));
    } else {
      console.log('error');
    }
  }

  compareSocials(s1, s2) {
    return s1.name === s2.name;
  }
}
