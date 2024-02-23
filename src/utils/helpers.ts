import { Member } from '../app/members/member.type';

export function datePickerFormatter(date: string | Date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const formattedDateString =
    parsedDate.getFullYear().toString().padStart(4, '0') +
    '-' +
    (parsedDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    parsedDate.getDate().toString().padStart(2, '0');
  return formattedDateString;
}

export function sortMembers(members: Member[]) {
  return members.sort((a, b) => {
    const result = a.lastName.localeCompare(b.lastName);

    return result !== 0 ? result : a.firstName.localeCompare(b.firstName);
  });
}

export function outputTeamMembersCount(count: number, name: string): string {
  return count === 0
    ? `${name} nemá zatím žádného člena`
    : `${name} má ${count} člen${count === 1 ? 'a' : count < 5 ? 'y' : 'ů'}`;
}

export function outputLineUpInfo(team: Member[], teamName: string): string {
  const playerCount = team.reduce(
    (acc, cur) => (acc += cur.lineUpRole.includes('Hráč') ? 1 : 0),
    0
  );
  const coachCount = team.reduce(
    (acc, cur) => (acc += cur.lineUpRole.includes('Trenér') ? 1 : 0),
    0
  );

  return `${teamName} má ${playerCount} hráč${
    playerCount === 0 || playerCount > 4 ? 'ů' : 'e'
  }, ${coachCount} trenér${
    coachCount === 0 || coachCount > 4 ? 'ů' : coachCount === 1 ? 'a' : 'y'
  }`;
}

export function filterMembers(members: Member[], searchVal: string) {
  const lowerCasedSearch = searchVal.toLowerCase();
  return members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(lowerCasedSearch) ||
      member.lastName.toLowerCase().includes(lowerCasedSearch)
  );
}
