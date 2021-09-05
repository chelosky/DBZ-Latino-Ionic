import { NgModule } from '@angular/core';
import { ChapterNamePipe } from './chapter-name.pipe';
import { FilterChapterPipe } from './filter-chapter.pipe';
import { FilterSagaPipe } from './filter-saga.pipe';

@NgModule({
  declarations: [
    ChapterNamePipe,
    FilterChapterPipe,
    FilterSagaPipe
  ],
  exports: [
    ChapterNamePipe,
    FilterChapterPipe,
    FilterSagaPipe
  ]
})
export class PipesModule { }
