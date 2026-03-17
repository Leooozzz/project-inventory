export function getDateRange(period: number) {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - period);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
}