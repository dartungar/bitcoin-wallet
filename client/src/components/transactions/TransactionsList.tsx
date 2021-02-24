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
    // address or 'all transactions' as list title
    const addr = props.address ? props.address : null;
    setListTitle(addr ? addr : "All transactions");

    if (addr === null && state.addresses.length === 0) {
      // if showing all transactions, update addresses info
      // to determine data formatting in ./TransactionListItem
      getAddressesData(state.seed).then(() => getTransactions(null));
    } else {
      // else just update transactions for given address
      getTransactions(props.address);
    }
  }, [state.addresses, props.address, state.seed]);

  // if loading, show spinner
  if (state.isLoading) {
    return <Spinner animation="border" variant="light" className="spinner" />;
  }

  return (
    <div className=" p-3 text-light">
      <h5 className="text-break pl-2">{listTitle}</h5>
      <Table hover responsive>
        <thead className="table-header text-light">
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
