export function getDateRange(period: number) {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - (period - 1));

  const format = (date: Date) =>
    date.toLocaleDateString("en-CA");

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
}