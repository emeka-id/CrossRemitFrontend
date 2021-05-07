import { IList, IResponse } from 'types/response';
import { IInterest, IMyInvestment } from 'types/user';

const interestTotal = (prev: number, current: IInterest): number =>
  prev + current.amount;

const activeInvestmentReduce = (prev: number, current: IMyInvestment): number =>
  prev + current.amount;

const remainingMonths = (createdAt: string, duration: number): number => {
  const date1 = new Date(createdAt);
  const date2 = new Date(createdAt);
  date2.setMonth(date2.getMonth() + duration);
  let differenceInTime = date2.getTime() - date1.getTime();
  let differenceInMonth = differenceInTime / (1000 * 3600 * 730);
  return Math.floor(differenceInMonth);
};

export const activeInvestmentTotal = (data: IList<IMyInvestment>) => {
  const activeInvestment: number = data.response.reduce(
    activeInvestmentReduce,
    0
  );
  return activeInvestment;
};

export const returnInvestmentData = (investment: IMyInvestment) => {
  const name = investment.investment.name;
  const duration = investment.investment.duration;
  const timeLeft = remainingMonths(
    investment.investment.createdAt,
    investment.investment.duration
  );
  const interest =
    investment.amount *
      (investment.percent / 100) *
      investment.investment.duration -
    investment.interest.reduce(interestTotal, 0);
  const interestPaid = investment.interest.reduce(interestTotal, 0);
  const progress =
    (investment.interest.reduce(interestTotal, 0) * 100) / investment.amount;

  return { name, duration, timeLeft, interest, interestPaid, progress };
};

export const checkInput = (number: number) => {
  const regex = new RegExp(/[,]/g);
  const convertToString = new String(number);
  const includesComma = convertToString.replace(',', '');
  return new Number(includesComma.replace(regex, ''));
};
