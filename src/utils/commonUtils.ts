function getDateForm({ year, month, date }: { year: number; month: string; date: string }) {
  return `${year}-${month}-${date}`;
}

function getTimeForm({ hour, minute }: { hour: string; minute: string }) {
  return `${hour}:${minute}`;
}

export function getFullDate(startTime: Date, isNow?: boolean) {
  const date = startTime.getDate();
  const month = startTime.getMonth() + (isNow ? 1 : 0);
  const year = startTime.getFullYear();

  const d = date < 10 ? `0${date}` : date + '';
  const m = month < 10 ? `0${month}` : month + '';

  return getDateForm({ year, month: m, date: d });
}

export function getFullTime(startTime: Date) {
  const hour = startTime.getHours();
  const minute = startTime.getMinutes();

  const h = hour < 10 ? `0${hour}` : hour + '';
  const m = minute < 10 ? `0${minute}` : minute + '';

  return getTimeForm({ hour: h, minute: m });
}

export function getTime(duration: number) {
  const minuteTerm = 1000 * 60;
  const hourTerm = 1000 * 60 * 60;

  const hour = Math.abs(Math.floor(duration / hourTerm));
  const minute = Math.round(((duration % hourTerm) * (hour || 1)) / minuteTerm);

  const h = hour < 10 ? `0${hour}` : hour + '';
  const m = minute < 10 ? `0${minute}` : minute + '';

  return getTimeForm({ hour: h, minute: m });
}
