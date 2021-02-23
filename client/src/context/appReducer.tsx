import {
  IAppState,
  IAction,
  SET_LOADING,
  SET_SEED,
  SET_ADDRESSES,
  ADD_ADDRESS,
  SET_TRANSACTIONS,
} from "./types";

const appReducer = (state: IAppState, action: IAction) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SEED:
      return {
        ...state,
        seed: action.payload,
      };
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
        isLoading: false,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        isLoading: false,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default appReducer;
