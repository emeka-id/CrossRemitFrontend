import { Role } from 'core/utils/enum';

export interface IAuth {
  type: string;
  token: string;
  user: IUser;
}

export interface ILogin extends IEmail {
  password: string;
}

export interface IEmail {
  email: string;
}

export interface INewPassword extends ILogin {
  otp: number;
}

export interface ISignup extends IEmail {
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}

export interface IUser {
  phone?: string;
  _id: string;
  firstName: string;
  lastName: string;
  dob?: string;
  pic?: string;
  gender?: string;
  email: string;
  country?: string;
  state?: string;
  town?: string;
  street?: string;
  bank: IBank;
  idCard: ICard;
  password?: string;
  role: string;
  validation?: string;
  suspend?: boolean;
  ban?: boolean;
  resetPassword: boolean;
}

export interface ICard {
  image?: string;
  type?: string;
  status: 'Pending' | 'Verified' | 'Not Verified';
}
export interface IBank {
  accountNumber?: string;
  bankName?: string;
  sortCode?: string;
}
export interface IInvest {
  duration: number;
  percent: number;
  name: string;
  _id: string;
  createdAt: string;
  dateInvested: string;
}

export interface ITransactions {
  user: string;
  ref: string;
  amount: number;
  purpose: string;
  type: string;
  createdAt: string;
  investmentName?: string;
}
export interface IUserInvestment {
  investment: string;
  amount: number;
  percent: number;
  investmentName?: string;
  dateInvested: string;
}

export interface IDashboard {
  totalInvestmentAmount: Number;
  activeInvestmentAmount: Number;
  totalReturnAmount: Number;
}

//TODO Find a way to merge IUserInvestment and IInvest types
export interface IMyInvestment {
  user: string;
  investment: IInvest;
  transaction: string;
  amount: number;
  percent: number;
  interest: IInterest[];
  active: boolean;
  dateInvested: string;
  nextROI: string;
}

export interface IInterest {
  ref: string;
  amount: number;
  date: string;
}

export interface IDeposit {
  amount: number;
  email: string;
}

export interface IVerifyDepositResponse {
  message: string;
  sucess: boolean;
}

export interface IVerifyDeposit {
  ref?: string;
  amount: number;
  purpose: string;
  type: string;
}

export interface IInitializeResponse {
  data: {
    authorization_url: string;
    reference: string;
    access_code: string;
  };
  message: string;
  success: boolean;
}

export interface IWithdrawal {
  amount: number;
}

export interface IBalanceResponse {
  data: number;
  success: boolean;
}
