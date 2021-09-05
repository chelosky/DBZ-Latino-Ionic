import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterChapter'
})
export class FilterChapterPipe implements PipeTransform {

  transform( list: any[], text: string, attributes: string[]): any[] {

    if(text === '' || list.length === 0){
      return list;
    }

    text = text.toLowerCase();

    let listFilter = list.filter((item) => {
      for (const attribute of attributes) {
        if(item[attribute].toString().toLowerCase().includes(text)) return true;
      }
      return false;
    });
    
    return listFilter;
  }

}
