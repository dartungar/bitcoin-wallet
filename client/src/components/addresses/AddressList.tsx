import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AddressListItem from "./AddressListItem";
import Table from "react-bootstrap/Table";

import { IAddress } from "../../context/types";

const AddressList: React.FC = (props) => {
  const {
    state: { seed, addresses },
    actions: { affirmSeed, getAddressesData },
  } = useContext(AppContext);

  useEffect(() => {
    if (!seed) {
      console.log("affirming seed");
      affirmSeed();
    }
  }, [seed]);

  useEffect(() => {
    if (seed) {
      console.log("getting addresses data", seed);
      getAddressesData(seed);
    }
  }, [seed]);

  return (
    <Table hover responsive>
      <thead>
        <tr>
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
