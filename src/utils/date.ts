// parse RFC3339 date to a readable date
export function parseRFC3339Date(raw: string): Date {
  const [date, time] = raw.split(/\s+/);
  console.log(date, time);
  const [year, month, day] = date.split('-').map(x => parseInt(x));
  const [hour, minute, second] = time.split(':').map(x => parseInt(x));
  return new Date(year, month - 1, day, hour + 7, minute, second);
}
