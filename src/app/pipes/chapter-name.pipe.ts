import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chapterName'
})
export class ChapterNamePipe implements PipeTransform {

  MAX_LENGHT = 50;

  transform(name: string, textWrap: boolean = true): string {
    if(textWrap && name.length > this.MAX_LENGHT ){
      return `${name.slice(0, this.MAX_LENGHT - 3)}...`;
    }
    return name;
  }

}
