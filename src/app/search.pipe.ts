import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(people, start): unknown {
    return people.filter((p)=>{
      if(p.data.date.localeCompare(start) >= 0){
          console.log(p.data.date)
          return true;
        
      }
      return false;
    });
  }

}
