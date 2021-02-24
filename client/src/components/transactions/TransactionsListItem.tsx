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

  // transaction data is modified for display and stored in itemState
  const [itemState, setItemState] = useState<State | null>(null);

  useEffect(() => {
    // transaction type is determined based on input & output addresses
    // our addres is output => we received BTC => transaction is incoming
    const type = addresses.some((a) => a.address === props.transaction.output)
      ? "Incoming"
      : "Outgoing";

    // determine whether show sender of recepient as 'other address' of the transaction
    const addr =
      type === "Incoming" ? props.transaction.input : props.transaction.output;

    setItemState({
      time: props.transaction.timestamp,
      type,
      address: addr,
      amount: props.transaction.amount,
      fee: props.transaction.fee,
    });
  }, []);

  return (
    <tr className="small text-light">
      <td>{itemState?.time}</td>
      <td
        className={
          itemState?.type === "Incoming" ? "text-success" : "text-danger"
        }
      >
        {itemState?.type}
      </td>
      <td className="small text-break">{itemState?.address}</td>
      <td
        className={
          itemState?.type === "Incoming" ? "text-success" : "text-danger"
        }
      >
        {itemState?.amount} ₿
      </td>
      <td>{itemState?.fee} ₿</td>
    </tr>
  );
};

export default TransactionsListItem;
