import React, { useEffect, useContext } from "react";
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

  useEffect(() => {
    const addr = props.address ? props.address : null;
    if (addr === null && state.addresses.length === 0) {
      getAddressesData().then(() =>
        getTransactions(props.address ? props.address : null)
      );
    } else {
      getTransactions(props.address ? props.address : null);
    }
  }, [state.addresses, props.address]);

  if (state.isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Table hover responsive>
      <thead>
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
  );
};

export default TransactionsList;
