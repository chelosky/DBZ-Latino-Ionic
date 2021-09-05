import { Pipe, PipeTransform } from '@angular/core';
import { Chapter } from '../models/chapter.model';
import { Movie } from '../models/movie.modal';
import { Ova } from '../models/ova.modal';

@Pipe({
  name: 'filterSaga'
})
export class FilterSagaPipe implements PipeTransform {

  transform(list: Chapter[] | Ova[] | Movie[],  saga?: number): Chapter[] | Ova[] | Movie[] {
    if(!saga) return list;

    return list.filter((chapter: Chapter) => chapter.season == saga );
  }

}
