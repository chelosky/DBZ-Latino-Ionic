import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  data: any = {
    folder: CONSTANTS.FOLDER_MOVIES,
    confirmText: CONSTANTS.MESSAGE_DOWNLOAD_MODAL_MOVIE
  }

  constructor(
    public chapterService: ChapterService
    ) { }

  ngOnInit(): void {
  }

}
