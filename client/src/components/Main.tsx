import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "./Menu";
import HomePage from "./HomePage";
import AddressDetails from "./addresses/AddressDetails";
import TransactionsList from "./transactions/TransactionsList";
import FirstTimeModal from "./FirstTimeModal";

const Main = () => {
  const {
    state: { seed },
    actions: { affirmSeed },
  } = useContext(AppContext);

  // show newly generated seed on first visit
  const [showFirstTimeModal, setShowFirstTimeModal] = useState<boolean>(false);

  useEffect(() => {
    if (!seed) {
      if (localStorage.getItem("seed") === null) {
        setShowFirstTimeModal(true);
      } else affirmSeed();
    }
  }, []);

  return (
    <Container fluid className="p-3 bg-dark full-height">
      <Router>
        <Row>
          <Col lg={1}>
            <Menu />
          </Col>
          <Col className="pr-0">
            <Switch>
              <Route path="/transactions" component={TransactionsList} />
              <Route path="/addresses/:address" component={AddressDetails} />
              <Route
                exact
                path="/"
                component={showFirstTimeModal ? FirstTimeModal : HomePage}
              />
            </Switch>
          </Col>
        </Row>
      </Router>
    </Container>
  );
};

export default Main;
