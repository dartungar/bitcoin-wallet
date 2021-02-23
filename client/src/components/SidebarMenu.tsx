import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

interface Props {}

const SidebarMenu = (props: Props) => {
  return (
    <Nav defaultActiveKey="/" className="flex-column text-secondary px-3 mb-4">
      <h5>Bitcoin Wallet</h5>
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/transactions">Transactions</Link>
      </Nav.Item>
    </Nav>
  );
};

export default SidebarMenu;
