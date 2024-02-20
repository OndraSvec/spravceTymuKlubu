import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOfBirth',
  standalone: true,
})
export class DateOfBirthPipe implements PipeTransform {
  transform(dob: string): string {
    return dob.split(/[/-.]/).reverse().join('.');
  }
}
