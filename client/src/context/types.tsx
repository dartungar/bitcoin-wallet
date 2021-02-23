interface ITransaction {
  id: string;
  timestamp: string;
  input: string;
  output: string;
  amount: Number;
  fee: Number;
}

interface IAddress {
  address: string;
  balance: Number;
}

interface IAppState {
  isLoading: boolean;
  seed: string | null;
  addresses: IAddress[];
  transactions: ITransaction[];
}

interface IAction {
  type: string;
  payload: any;
}

export const SET_LOADING = "SET_LOADING";
export const SET_SEED = "SET_SEED";
export const SET_ADDRESSES = "SET_ADDRESSES";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const SET_TRANSACTIONS = "SET_TRANSACTIONS";

export type { ITransaction };
export type { IAddress };
export type { IAppState };
export type { IAction };
