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
