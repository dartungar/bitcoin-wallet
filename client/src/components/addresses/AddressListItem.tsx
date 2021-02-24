import React from "react";
import { Link } from "react-router-dom";
import { IAddress } from "../../context/types";

interface Props {
  address: IAddress;
}

const AddressListItem = (props: Props) => {
  return (
    <tr className="text-light text-small">
      <td className="text-break text-light text-small">
        <Link
          to={`/addresses/${props.address.address}`}
          className="text-light small"
        >
          {props.address.address}
        </Link>
      </td>
      <td>{props.address.balance}</td>
    </tr>
  );
};

export default AddressListItem;
