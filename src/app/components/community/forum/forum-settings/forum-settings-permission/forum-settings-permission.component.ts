import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from '../../../../../store/state';
import { Store } from '@ngrx/store';
import * as SocialActions from './../../../../../store/social/social.actions';
import { SocialType } from '../../../../../models/user.model';
import { getMergedRoute } from '../../../../../store/router/router.selectors';
import { first, map, skipWhile, throttleTime } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SocialUserRole, SocialUserStatus } from '../../../../../constants/social.constant';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-forum-settings-permission',
  templateUrl: './forum-settings-permission.component.html',
  styleUrls: ['./forum-settings-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumSettingsPermissionComponent implements OnDestroy {

  socialUserRole = SocialUserRole;
  socialUserStatus = SocialUserStatus;
  displayedColumns: string[] = ['user', 'status', 'role', 'writeAccess', 'remove'];
  dataSource: MatTableDataSource<any>;
  sid: string;
  users: any = {};
  subs: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private store: Store<AppState>, private change: ChangeDetectorRef, private dialog: MatDialog) {
    this.store.select(getMergedRoute).pipe(first()).subscribe((r) => {
      this.store.dispatch(SocialActions.SocialUsersGetting({ sname: r.params.name, socialType: SocialType.FORUM }));
    }

    );
    this.subs = this.store.select('social')
      .pipe(
        map(s => ({ users: s.users, sid: s.social?._id })),
        skipWhile(u => !u.sid || u.users === null),
        throttleTime(500)
      ).subscribe((d: any) => {
        this.sid = d.sid;
        this.dataSource = new MatTableDataSource<any>(d.users);
        this.dataSource.paginator = this.paginator;
        this.change.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  changeCheckbox(event: MatCheckboxChange, element) {
    this.users[element.username] = this.users[element.username] ?
      { ...this.users[element.username], writeAccess: event.checked } :
      { ...element, writeAccess: event.checked };
  }
  onRoleChange(event: MatSelectChange, element) {
    this.users[element.username] = this.users[element.username] ?
      { ...this.users[element.username], role: event.value } :
      { ...element, role: event.value };

  }
  onStatusChange(event: MatSelectChange, element) {
    this.users[element.username] = this.users[element.username] ?
      { ...this.users[element.username], status: event.value } :
      { ...element, status: event.value };
  }


  onRemoveUser(element) {
    this.dialog.open(ConfirmDialogComponent, { data: `آیا از حذف ${element.username} اطمینان دارید؟` }).afterClosed().subscribe(r => {
      if (r) {
        this.store.dispatch(SocialActions.SocialUserRemoving({ sid: this.sid, socialType: SocialType.FORUM, uid: element._id }));
        this.dataSource.data = this.dataSource.data.filter(i => i.username !== element.username);
      }
    });
  }

  onSave() {
    if (!!Object.keys(this.users).length) { // some change happened
      const updatedUsers = Object.values(this.users);
      this.store.dispatch(SocialActions.SocialUsersUpdating({ sid: this.sid, socialType: SocialType.FORUM, updatedUsers }));
      this.users = {};
    }
  }
  trackByFn(_, item) {
    return item._id;
  }
}
