import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../context/AppContext";

const AddAddressBtn = () => {
  const {
    state: { seed },
    actions: { generateAddress },
  } = useContext(AppContext);
  return <Button onClick={() => generateAddress(seed)}>Add new address</Button>;
};

export default AddAddressBtn;
