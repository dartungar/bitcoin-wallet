import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../context/AppContext";

const AddAddressBtn: React.FC = () => {
  const {
    state: { seed },
    actions: { generateAddress },
  } = useContext(AppContext);
  return (
    <Button variant="light" onClick={() => generateAddress(seed)}>
      Add new address
    </Button>
  );
};

export default AddAddressBtn;
