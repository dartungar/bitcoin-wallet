import React from "react";
import { Link } from "react-router-dom";
import { IAddress } from "../../context/types";

interface Props {
  address: IAddress;
}

const AddressListItem = (props: Props) => {
  return (
    <tr>
      <td>
        <Link to={`/addresses/${props.address.address}`}>
          {props.address.address}
        </Link>
      </td>
      <td>{props.address.balance}</td>
    </tr>
  );
};

export default AddressListItem;
