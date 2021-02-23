import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../context/AppContext";

interface Props {}

const AddAddressBtn = (props: Props) => {
  const {
    state: { seed },
    actions: { generateAddress },
  } = useContext(AppContext);
  return <Button onClick={() => generateAddress(seed)}>Add new</Button>;
};

export default AddAddressBtn;
