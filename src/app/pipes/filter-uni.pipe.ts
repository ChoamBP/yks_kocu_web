import { Pipe, PipeTransform } from '@angular/core';
import { UniversityModel } from '../model/universityModel';

@Pipe({
  name: 'filterUni'
})
export class FilterUniPipe implements PipeTransform {

  transform(value: UniversityModel[], filterText: string): UniversityModel[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:UniversityModel)=>p.universite.toLocaleLowerCase().indexOf(filterText)!==-1||
    p.sehir.toLocaleLowerCase().indexOf(filterText)!==-1||
    p.fakulte.toLocaleLowerCase().indexOf(filterText)!==-1||
    p.universite_turu.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}
