import { Role } from 'core/utils/enum';

export interface IAuth {
  type: string;
  token: string;
}

export interface ILogin  extends IEmail{
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
