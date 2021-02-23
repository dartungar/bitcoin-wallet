import React from "react";
import AddressList from "./addresses/AddressList";
import AddAddressBtn from "./addresses/AddAddressBtn";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <div>
      <AddressList />
      <AddAddressBtn />
    </div>
  );
};

export default MainPage;
