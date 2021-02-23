import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarMenu from "./components/SidebarMenu";
import HomePage from "./components/HomePage";
import AddressDetails from "./components/addresses/AddressDetails";
import TransactionsList from "./components/transactions/TransactionsList";
import FirstTimeModal from "./components/FirstTimeModal";

const AppContainer = () => {
  const {
    state: { seed },
    actions: { affirmSeed },
  } = useContext(AppContext);

  const [showFirstTimeModal, setShowFirstTimeModal] = useState<boolean>(false);

  useEffect(() => {
    if (!seed) {
      if (localStorage.getItem("seed") === null) {
        setShowFirstTimeModal(true);
      } else affirmSeed();
    }
  }, []);

  //if (showFirstTimeModal) return <FirstTimeModal />;

  return (
    <Container fluid className="px-0 py-3">
      <Router>
        <Row>
          <Col lg={1}>
            <SidebarMenu />
          </Col>
          <Col>
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

export default AppContainer;
