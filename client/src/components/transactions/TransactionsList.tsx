import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import TransactionsListItem from "./TransactionsListItem";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  address: string | undefined;
  children?: React.ReactNode;
}

const TransactionsList = (props: Props) => {
  const {
    state,
    actions: { getTransactions, getAddressesData },
  } = useContext(AppContext);

  const [listTitle, setListTitle] = useState<string>("");

  useEffect(() => {
    const addr = props.address ? props.address : null;
    setListTitle(addr ? addr : "All transactions");
    if (addr === null && state.addresses.length === 0) {
      console.log("getting addresses data for transactions list...");
      getAddressesData(state.seed).then(() =>
        getTransactions(props.address ? props.address : null)
      );
    } else {
      getTransactions(props.address ? props.address : null);
    }
  }, [state.addresses, props.address, state.seed]);

  if (state.isLoading) {
    return <Spinner animation="border" className="margin-auto" />;
  }

  return (
    <div>
      <h5 className="text-break">{listTitle}</h5>
      <Table hover responsive>
        <thead className="table-header">
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {state.transactions.map((t) => (
            <TransactionsListItem transaction={t} key={t.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsList;
