import { Component } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page{

  saga: number = CONSTANTS.SAGA_BUU; 

  data: any = {
    folder: CONSTANTS.FOLDER_CHAPTERS,
    confirmText: CONSTANTS.MESSAGE_DOWNLOAD_MODAL_CHAPTER
  }

  constructor(
    public chapterService: ChapterService
    ) { }

  ngOnInit(): void {
  }

}
