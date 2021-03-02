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
  bank?: {
    accountNumber: string;
    bankName: string;
  };
  idCard: {
    image?: string;
    type?: string;
    status: 'Pending' | 'Verified' | 'Not Verified';
  };
  password?: string;
  role: string;
  validation?: string;
}
