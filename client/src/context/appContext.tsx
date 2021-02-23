import React, { useReducer, createContext } from "react";
import {
  IAppState,
  SET_LOADING,
  SET_SEED,
  SET_ADDRESSES,
  ADD_ADDRESS,
  SET_TRANSACTIONS,
} from "./types";
import appReducer from "./appReducer";

const initialState: IAppState = {
  isLoading: false,
  seed: null,
  addresses: [],
  transactions: [],
};

const AppContext = createContext<{
  state: IAppState;
  actions: any;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  actions: {},
  dispatch: () => null,
});

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING, payload: null });
  };

  // check if seed is present
  // if not, get it from local storage
  // generate via API if necessary
  const affirmSeed = async () => {
    if (state.seed === null || state.seed === undefined) {
      let seed = localStorage.getItem("seed");
      if (!seed) {
        await generateAndSaveSeed();
        seed = localStorage.getItem("seed");
      }
      dispatch({ type: SET_SEED, payload: seed });
    }
  };

  // get generated seed from API
  // save to local storage
  const generateAndSaveSeed = async () => {
    const res = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8000" : ""
      }/api/seed`
    );

    if (res.ok) {
      const seed = await res.json();
      localStorage.setItem("seed", seed);
      return seed;
    }
  };

  // generate new address for the seed
  // not really valid bitcoin address right now (see API docs)
  const generateAddress = async (seed: string) => {
    //
    setLoading();
    const res = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8000" : ""
      }/api/address`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "appliaction/json",
        },
        body: JSON.stringify({ seed }),
      }
    );

    if (res.ok) {
      const new_address = await res.json();
      dispatch({
        type: ADD_ADDRESS,
        payload: { address: new_address, balance: 0 },
      });
    }
  };

  // TODO: make it POST
  const getAddressesData = async (seed: string) => {
    //
    setLoading();

    const res = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8000" : ""
      }/api/addresses?seed=${seed}`
    );

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: SET_ADDRESSES, payload: data });
      console.log("got addresses data...");
    }
  };

  const getTransactions = async (address: string | null) => {
    //
    setLoading();

    const req_params = address ? `?address=${address}` : "";
    const res = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:8000" : ""
      }/api/transactions${req_params}`
    );

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: SET_TRANSACTIONS, payload: data });
      console.log("got transactions data...");
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        actions: {
          setLoading,
          affirmSeed,
          generateAddress,
          getAddressesData,
          getTransactions,
        },
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
