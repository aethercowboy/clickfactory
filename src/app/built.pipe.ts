import { Pipe, PipeTransform } from '@angular/core';
import { Building } from './building.service';

@Pipe({
  name: 'built'
})
export class BuiltPipe implements PipeTransform {

  transform(buildings: Building[]): Building[] {
    return buildings.filter(b => b.built > 0);
  }

}
