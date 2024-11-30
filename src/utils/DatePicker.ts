export const isWeekend = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6;

export const generateMonthDays = (
  month: number,
  year: number
): (Date | null)[] => {
  const days: (Date | null)[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(new Date(year, month, day));
  }
  if (firstDayOfWeek > 0) {
    days.unshift(...Array(firstDayOfWeek).fill(null));
  }

  while (days.length < 42) {
    days.push(null);
  }

  console.log(days, "days");
  return days;
};

export const isValidDate = (date: Date, disablePastDates: boolean): boolean => {
  if (isWeekend(date)) return false;

  if (disablePastDates && date < new Date()) return false;

  return true;
};

export const getWeekendsBetween = (start: Date, end: Date): Date[] => {
  const weekends: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    if (isWeekend(current)) {
      weekends.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return weekends;
};
