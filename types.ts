export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}