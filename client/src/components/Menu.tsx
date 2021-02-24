import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const SidebarMenu: React.FC = () => {
  return (
    <Nav defaultActiveKey="/" className="flex-column text-light px-3 mb-4">
      <h5>Bitcoin Wallet</h5>
      <Nav.Item>
        <Link to="/" className="text-info">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/transactions" className="text-info">
          Transactions
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default SidebarMenu;
