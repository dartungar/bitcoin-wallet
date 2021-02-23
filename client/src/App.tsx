import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarMenu from "./components/SidebarMenu";
import MainPage from "./components/MainPage";
import AddressDetails from "./components/addresses/AddressDetails";
import TransactionsList from "./components/transactions/TransactionsList";

function App() {
  return (
    <AppContextProvider>
      <Container fluid className="px-0">
        <Router>
          <Row>
            <Col xs={2}>
              <SidebarMenu />
            </Col>
            <Col>
              <Switch>
                <Route path="/transactions" component={TransactionsList} />
                <Route path="/addresses/:address" component={AddressDetails} />
                <Route exact path="/" component={MainPage} />
              </Switch>
            </Col>
          </Row>
        </Router>
      </Container>
    </AppContextProvider>
  );
}

export default App;
