import React from "react";
import { useParams } from "react-router-dom";
import TransactionsList from "../transactions/TransactionsList";

const AddressDetails: React.FC = () => {
  const { address } = useParams<any>();

  return <TransactionsList address={address} />;
};

export default AddressDetails;
