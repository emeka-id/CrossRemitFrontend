export interface IBankDetails {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBankResolve extends INameResolve {
  data: INameResolve;
  message: string;
  success: boolean;
}

export interface INameResolve {
  account_number: string;
  account_name: string;
  bank_id: number;
}
