import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchByTitle): any {
    if (!searchByTitle) {
      return value;
    }

    return value.filter(it => {

      const title = it.title.toLowerCase().includes(searchByTitle.toLowerCase());

      return title;
    });
  }

}
