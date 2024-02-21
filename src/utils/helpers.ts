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
