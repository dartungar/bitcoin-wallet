import React from "react";
import AddressList from "./addresses/AddressList";
import AddAddressBtn from "./addresses/AddAddressBtn";

const MainPage: React.FC = () => {
  return (
    <div className="p-3 text-light">
      <h5 className="p-2">My wallet</h5>
      <AddressList />
      <AddAddressBtn />
    </div>
  );
};

export default MainPage;
