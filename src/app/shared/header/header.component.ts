import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private themeService: ThemeService, public dialog: MatDialog) {}

  ngOnInit() {}
  onLogin(): void {
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }

  onThemeChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.themeService.darkTheme();
    } else {
      this.themeService.defaultTheme();
    }
  }
}
