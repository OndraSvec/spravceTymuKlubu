import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outputTeamMembersCount',
  standalone: true,
})
export class OutputTeamMembersCountPipe implements PipeTransform {
  transform(count: number, name: string): string {
    return count === 0
      ? `${name} nemá zatím žádného člena`
      : `${name} má ${count} člen${count === 1 ? 'a' : count < 5 ? 'y' : 'ů'}`;
  }
}
