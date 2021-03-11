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
  name: string;
  _id: string;
}
export interface IUserInvestment {
  investment: string;
  amount: number;
  percent: number;
  investmentName?: string;
}

export interface IUserTransactions {
  user: string;
  ref: string;
  amount: number;
  purpose: string;
  type: string;
  createdAt: string;
  investmentName: string;
}

export interface ITransactions {
  pagination: {
    total: number;
    currentPage: number;
    size: number;
  };
  response: [];
}
