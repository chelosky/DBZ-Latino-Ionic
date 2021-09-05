import { Component, Input, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter.service';
import { Chapter } from '../../models/chapter.model';
import { Ova } from '../../models/ova.modal';
import { Movie } from '../../models/movie.modal';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent implements OnInit {

  @Input() data: Chapter[] | Ova[] | Movie[] = [];
  @Input() folder: string;
  @Input() confirmText: string;
  
  filterText: string = '';

  constructor(
    public chapterService: ChapterService
    ) { }

  ngOnInit(): void {
  }

  async getData(){
    await this.chapterService.prepareData();
  }

  async doRefresh(event) {
    await this.getData();
    event.target.complete();
  }

  filterList(event){
    this.filterText = event.detail.value;
  }

}
