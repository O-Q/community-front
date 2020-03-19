import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as BalloonBlockEditor from '../../../../../../libs/ckeditor-personal-build';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { CKEDITOR_DEFAULT_CONFIG, CKEDITOR_DEFAULT_CONFIG_AUTO_SAVE } from '../../../../constants/ckeditor.constant';
import { AppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { UserState } from '../../../../store/user';
import { getMergedRoute } from '../../../../store/router/router.selectors';
import { FormControl, Validators } from '@angular/forms';

import * as PostActions from './../../../../store/post/post.actions';


@Component({
  selector: 'app-forum-new-post',
  templateUrl: './forum-new-post.component.html',
  styleUrls: ['./forum-new-post.component.scss']
})
export class ForumNewPostComponent implements OnInit {
  editor = BalloonBlockEditor;
  selectedSocial = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  subtitle = new FormControl('', []);
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
  user$ = this.store.select('user');
  constructor(private router: Router, private route: ActivatedRoute, private bpo: BreakpointObserver, private store: Store<AppState>) {
    this.isXSmall$ = this.bpo.observe(Breakpoints.XSmall).pipe(map(is => is.matches));
  }

  ngOnInit() {
    this.store.select(getMergedRoute).pipe(first()).subscribe(route =>
      this.selectedSocial.setValue({ name: route.params.name, socialType: route.url.split('/')[1] === 'c' ? 'FORUM' : 'BLOG' }));

    this.store.dispatch(UserState.UserSocialsFetching());
  }
  changeForum(selected: { name: string, socialType: 'FORUM' | 'BLOG' }) {
    this.router.navigate(['c', selected.name, 'new']);
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
  onPublish(socials) {
    if (this.title.valid && this.wordsCount >= 3) {
      const socialId = socials.find((x => x.social?.name === this.selectedSocial.value.name)).social._id;
      const text = this.text;
      const title = this.title.value;
      const subtitle = this.subtitle.value;

      this.store.dispatch(PostActions.PostPublishing(
        {
          post: { title, subtitle, text },
          sid: socialId,
          sname: this.selectedSocial.value.name
        }));
    } else {
      console.log('error');
    }


  }

  compareSocials(s1, s2) {
    return s1.name === s2.name;
  }
}
