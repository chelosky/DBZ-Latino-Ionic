import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private darkModeService: DarkModeService
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.checkDarkTheme();
    });
  }

  async checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storageDark = await this.darkModeService.getStorageDarkMode();
    if( prefersDark || storageDark ){
      document.body.classList.toggle( 'dark' );
      await this.darkModeService.setStorageDarkMode();
    }
  }
}
