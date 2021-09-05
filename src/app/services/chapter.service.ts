import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as CONSTANTS from '../constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chapter } from '../models/chapter.model';
import { FileStorageService } from './file-storage.service';
import { Ova } from '../models/ova.modal';
import { Movie } from '../models/movie.modal';
import { Data } from '../models/data.model';
import { DataEpisode } from '../models/data-episode.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  public dataEpisodes: DataEpisode = {
    sayayin: [],
    freezer: [],
    garlic: [],
    cell: [],
    buu: [],
    movies: []
  };

  constructor(
    private dataService: DataService,
    private fileStorageService: FileStorageService
  ) { 
    this.prepareData();
  }


  async prepareData(){
    const data: Data = await this.getData().toPromise();

    this.dataEpisodes.sayayin = data.chapters.filter((chapter: Chapter) => chapter.season == CONSTANTS.SAGA_SAYAYIN );
    this.dataEpisodes.freezer = data.chapters.filter((chapter: Chapter) => chapter.season == CONSTANTS.SAGA_FREEZER );
    this.dataEpisodes.garlic = data.chapters.filter((chapter: Chapter) => chapter.season == CONSTANTS.SAGA_GARLIC );
    this.dataEpisodes.cell = data.chapters.filter((chapter: Chapter) => chapter.season == CONSTANTS.SAGA_CELL );
    this.dataEpisodes.buu = data.chapters.filter((chapter: Chapter) => chapter.season == CONSTANTS.SAGA_BUU );
    this.dataEpisodes.movies = data.movies;

    console.log(this.dataEpisodes);
  }

  getData(): Observable<any>{
    return this.dataService.get(`${CONSTANTS.API}/dbz/data`)
    .pipe(
      map(resp => {
        return resp['body'];
      })
    )
  }

  generateDirectDownloadLink(data: Chapter|Movie|Ova){
    return this.dataService.post(`${CONSTANTS.API}/download`,
    {
      url: data.url
    })
    .pipe(
      map(resp => {
        return resp['body'];
      })
    )
  }

  verifyChapterLocal(chapter: Chapter, parentFolder: string = CONSTANTS.FOLDER_CHAPTERS): Promise<boolean>{
    return this.fileStorageService.verifyFileInStorage(parentFolder, this.generateFileName(chapter));
  }

  getFilePathDataStorage(chapter: Chapter|Movie|Ova, parentFolder: string = CONSTANTS.FOLDER_CHAPTERS): string{
    return this.fileStorageService.getFilePathDataStorage(parentFolder, this.generateFileName(chapter));
  }

  async downloadChapter(chapter: Chapter|Movie|Ova, parentFolder: string = CONSTANTS.FOLDER_CHAPTERS){
    const {direct_link}: any = await this.generateDirectDownloadLink(chapter).toPromise();
    return this.fileStorageService.downloadFile(direct_link, parentFolder, this.generateFileName(chapter));
  }

  deleteFileStorage(chapter: Chapter|Movie|Ova, parentFolder: string = CONSTANTS.FOLDER_CHAPTERS): Promise<boolean>{
    return this.fileStorageService.deleteFilePathDataStorage(parentFolder, this.generateFileName(chapter));
  }

  private generateFileName(chapter: Chapter|Movie|Ova): string{
    return `${chapter.code}${CONSTANTS.EXTENSION_FILE}`;
  }

}
