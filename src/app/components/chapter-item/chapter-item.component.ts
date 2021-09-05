import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from 'src/app/models/chapter.model';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { AndroidPermissionService } from '../../services/android-permission.service';
import { ChapterService } from '../../services/chapter.service';
import * as CONSTANTS from '../../constants';
import { UiHelperService } from '../../services/ui-helper.service';
import { AlertHelperService } from '../../services/alert-helper.service';
import { Ova } from '../../models/ova.modal';
import { Movie } from '../../models/movie.modal';
import { indicatorRotate, fadeIn, fastFadeIn } from '../../utils/animations';
import { StorageService } from '../../services/storage.service';
import { CHAPTER_VIEWED_KEY } from '../../constants';

@Component({
  selector: 'app-chapter-item',
  templateUrl: './chapter-item.component.html',
  styleUrls: ['./chapter-item.component.scss'],
  animations: [
    indicatorRotate,
    fastFadeIn
  ]
})
export class ChapterItemComponent implements OnInit {

  @Input() chapter: Chapter | Ova | Movie;
  @Input() position: number;

  @Input() folder: string;
  @Input() confirmText: string;

  expanded: boolean = false;
  existInLocal: boolean = false;
  viewed: boolean = false;
  storage_key: string = ``;

  constructor(
    private streamingMedia: StreamingMedia,
    private androidPermissionService: AndroidPermissionService,
    private chapterService: ChapterService,
    private uiHelperService: UiHelperService,
    private alertHelper: AlertHelperService,
    private storageService: StorageService
    ) { }

  ngOnInit() {
    if(!this.confirmText) this.confirmText = CONSTANTS.MESSAGE_DOWNLOAD_MODAL_CHAPTER;
    if(!this.folder) this.folder = CONSTANTS.FOLDER_CHAPTERS;
    this.storage_key = `${CHAPTER_VIEWED_KEY}${this.chapter.code}`;
    this.verifyLocalFile();
  }

  async verifyLocalFile(){
    this.existInLocal = await this.chapterService.verifyChapterLocal(this.chapter, this.folder);
    const viewed = await this.storageService.get(this.storage_key);
    this.viewed = viewed ? true : false;
  }

  async changeViewedStatus(event: any){
    if(this.viewed){
      this.setStorageViewed();
    }else{
      this.removeStorageViewed();
    }
  }

  async setStorageViewed(){
    await this.storageService.set(this.storage_key, true);
  }

  async removeStorageViewed(){
    await this.storageService.remove(this.storage_key);
  }

  async playChapter(){
    console.log(`Playing chapter ${this.chapter.code}-${this.chapter.name}`);
    if(this.existInLocal){
      this.seeStreaming(this.chapterService.getFilePathDataStorage(this.chapter, this.folder));
    }else{
      const {direct_link}: any = await this.chapterService.generateDirectDownloadLink(this.chapter).toPromise();
      console.log(direct_link)
      this.seeStreaming(direct_link);
    }
  }
  
  async confirmDownload(){
    const response = await this.alertHelper.presentAlertConfirm(
      CONSTANTS.TITLE_DOWNLOAD_MODAL,
      this.confirmText
    );
    if(response){
      this.downloadChapter();
    }
  }

  async downloadChapter(){

    await this.androidPermissionService.verifyReadWritePermission();

    console.log(`Downloading chapter ${this.chapter.name}`);
    try {
      this.uiHelperService.presentLoading(`Downloading: ${this.chapter.name}`);
      await this.chapterService.downloadChapter(this.chapter, this.folder);
      this.existInLocal = true;
      this.uiHelperService.closeLoading();
      console.log(`Downloaded chapter ${this.chapter.code}-${this.chapter.name}`);
    } catch (error) {
      this.uiHelperService.closeLoading();
      console.log(error);
      this.uiHelperService.presentLoading('An error has ocurred', 3000);
    }
  }
  
  async deleteChapter(index: number){
    console.log(`Deleting chapter ${this.chapter.code}-${this.chapter.name}`);
    const response = await this.alertHelper.presentAlertConfirm(
      CONSTANTS.TITLE_DELETE_MODAL,
      CONSTANTS.MESSAGE_DELETE
      );
      if(response){
        const deleted = await this.chapterService.deleteFileStorage(this.chapter, this.folder);
        if(deleted){
          this.existInLocal = false;
          console.log(`Deleted chapter ${this.chapter.code}-${this.chapter.name}`);
        }else{
          this.uiHelperService.presentLoading('An error has ocurred', 3000);
        }
    }
  }

  seeStreaming(url: string){
    this.viewed = true;
    let options: StreamingVideoOptions = {
      successCallback: async () => {
        this.expanded = false;
        await this.setStorageViewed();
        console.log('Video played');
      },
      errorCallback: (e) => {
        console.log('Error streaming')
      },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };
    this.streamingMedia.playVideo(url, options);    
  }

  expand(){
    this.expanded = !this.expanded;
  }
}
