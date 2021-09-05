import { Component } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page{

  saga: number = CONSTANTS.SAGA_CELL; 

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
