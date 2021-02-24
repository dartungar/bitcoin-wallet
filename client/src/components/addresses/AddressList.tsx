import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AddressListItem from "./AddressListItem";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { IAddress } from "../../context/types";

const AddressList: React.FC = () => {
  const {
    state: { seed, addresses, isLoading },
    actions: { getAddressesData },
  } = useContext(AppContext);

  useEffect(() => {
    if (seed) {
      getAddressesData(seed);
    }
  }, [seed]);

  // if loading, show spinner
  if (isLoading) {
    return <Spinner animation="border" variant="light" className="spinner" />;
  }

  return (
    <Table hover responsive>
      <thead>
        <tr className="table-header text-light">
          <th>Address</th>
          <th>₿</th>
        </tr>
      </thead>
      <tbody>
        {addresses.map((a: IAddress) => (
          <AddressListItem address={a} key={a.address} />
        ))}
      </tbody>
    </Table>
  );
};

export default AddressList;
