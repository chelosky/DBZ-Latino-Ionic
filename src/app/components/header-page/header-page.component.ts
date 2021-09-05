import { Component, Input, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { fadeIn } from '../../utils/animations';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
  animations: [
    fadeIn
  ]
})
export class HeaderPageComponent {

  @Input('title') title: string = '';
  @Input('backPath') backPath: string = '/';
  @Input('iconUnselect') iconUnselect: string = 'sunny-outline';
  @Input('iconSelect') iconSelect: string = 'moon';

  @Input('iconStatus') iconStatus: boolean = false;

  @Input('flagLoading') flagLoading: boolean = false;
  @Input('flagBack') flagBack: boolean = false;
  @Input('flagIcon') flagIcon: boolean = false;

  @Output() handleStatus: EventEmitter<boolean>;

  constructor(
    public darkModeService: DarkModeService
  ) {
    this.handleStatus = new EventEmitter();
  }

  async changeStatus(){
    if(!this.darkModeService.dark_mode_status){
      this.darkModeService.setStorageDarkMode();
    }else{
      this.darkModeService.removeDarkMode();
    }
    document.body.classList.toggle( 'dark' );
    this.handleStatus.emit(this.iconStatus);
  }
  
}
