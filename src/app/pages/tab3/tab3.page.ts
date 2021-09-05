import { Component } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  saga: number = CONSTANTS.SAGA_GARLIC; 

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
