import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { UserContextProvider } from "../UserContext";
import AccountBox from "./AccountBox";
import "./FrontPage.css";

const FrontPage = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContextProvider userData={{ userID, password }}>
      <div className="FrontPage">
        <div className="FrontPage-header">
          <h1 className="md-3">Bank Application</h1>
        </div>
        <Container
          fluid
          className="d-flex flex-column  justify-content-center"
          style={{ color: "white", minHeight: "95vh" }}
        >
          <Row className="justify-content-center">
            <AccountBox />
          </Row>
        </Container>
      </div>
    </UserContextProvider>
  );
};

export default FrontPage;
