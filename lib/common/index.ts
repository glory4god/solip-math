export function mongoDateFormatting(date: Date) {
  const year = date.toString().split('-')[0];
  const month = date.toString().split('-')[1];
  const day = date.toString().split('-')[2].substr(0, 2);
  return `${year}-${month}-${day}`;
}
