import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navigationTitle',
  standalone: true,
})
export class NavigationTitlePipe implements PipeTransform {
  transform(title: string): string {
    return title === '/'
      ? 'Členové'
      : title === '/soupisky'
      ? 'Soupisky'
      : 'Týmy';
  }
}
