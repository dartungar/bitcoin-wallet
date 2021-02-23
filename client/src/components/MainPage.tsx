import React, { useEffect, useContext } from "react";
import AddressList from "./addresses/AddressList";
import AddAddressBtn from "./addresses/AddAddressBtn";
import { AppContext } from "../context/AppContext";
import Spinner from "react-bootstrap/Spinner";

interface Props {}

const MainPage = (props: Props) => {
  const { state } = useContext(AppContext);

  // if (state.isLoading) {
  //   return <Spinner animation="border" />;
  // }

  return (
    <div>
      <AddressList />
      <AddAddressBtn />
    </div>
  );
};

export default MainPage;
