import React, { useContext, useState, useEffect } from "react";
import { ITransaction } from "../../context/types";
import { AppContext } from "../../context/AppContext";

interface Props {
  transaction: ITransaction;
}

interface State {
  time: string;
  type: string;
  address: string;
  amount: Number;
  fee: Number;
}

const TransactionsListItem = (props: Props) => {
  const {
    state: { addresses },
  } = useContext(AppContext);

  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const type = addresses.some((a) => a.address === props.transaction.output)
      ? "Incoming"
      : "Outgoing";
    const addr =
      type === "Incoming" ? props.transaction.input : props.transaction.output;
    setState({
      time: props.transaction.timestamp,
      type,
      address: addr,
      amount: props.transaction.amount,
      fee: props.transaction.fee,
    });
  }, []);

  return (
    <tr className="small">
      <td>{state?.time}</td>
      <td
        className={state?.type === "Incoming" ? "text-success" : "text-danger"}
      >
        {state?.type}
      </td>
      <td className="small text-break">{state?.address}</td>
      <td
        className={state?.type === "Incoming" ? "text-success" : "text-danger"}
      >
        {state?.amount}
      </td>
      <td>{state?.fee}</td>
    </tr>
  );
};

export default TransactionsListItem;
