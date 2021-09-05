import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  saga: number = CONSTANTS.SAGA_SAYAYIN; 

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
