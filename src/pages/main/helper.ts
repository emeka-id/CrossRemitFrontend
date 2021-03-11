export const reduceFunction = (a: number, b: number) => {
  return a + b;
};

export const remainingMonths = (createdAt: string, duration: number) => {
  const date1 = new Date(createdAt);
  const date2 = new Date(createdAt);
  date2.setMonth(date2.getMonth() + duration);
  let differenceInTime = date2.getTime() - date1.getTime();
  let differenceInMonth = differenceInTime / (1000 * 3600 * 730);
  return differenceInMonth;
};
