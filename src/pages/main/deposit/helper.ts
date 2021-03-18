import { IInitializeResponse, IVerifyDeposit } from 'types/user';

export const calculateCharges = (amount: number) => {
  const charges = Number(amount) * 0.015;
  const chargesPlus100 = Number(charges) + 100;
  const amountWithCharges = Number(chargesPlus100) + Number(amount);
  const finalAmount = Number(amountWithCharges) * 100;
  return { chargesPlus100, finalAmount };
};
