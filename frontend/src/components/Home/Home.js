import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Transfer from "../Transactions/Transfer";
import { api } from "../../api/axiosConfig";
import PieChart from "./PieChart";
import AccList from "./AccList";
import OpenAccount from "./OpenAccount";
import "./Home.css";
import Header from "./Header";

// import Exchange from "../Exchange/Exchange";

const Home = () => {
  const [user, setUser] = useState([]);

  const { userID } = useParams();
  const [password, setPassword] = useState();
  const [accList, setAccList] = useState([]);
  const [accNum, setAccNum] = useState();

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  function openAcc(type) {
    api
      .post(`/api/v1/user/${userID}/${type}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getUser = () => {
    api
      .get(`/api/v1/user/${userID}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, [userID]);

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        if (key === "userID") {
          user.id = value;
        } else if (key === "password") {
          setPassword(value);
        } else if (key === "accountList") {
          setAccList(value);
        } else if (key === "numOfAccounts") {
          setAccNum(value);
        }
      });
    }
  }, [user]);

  return (
    <div className="Home">
      <Header userID={userID} password={password} />
      <Container>
        <Row className="mb-5">
          <h2>Welcome {userID}</h2>
        </Row>
        <Row xs={1} md={2} lg={2} className="g-4">
          <Col key={1}>
            <Card border="dark">
              <AccList userID={userID} accList={accList} />
              <OpenAccount userID={userID} openAcc={openAcc} />
            </Card>
          </Col>
          <Col key={2}>
            <Transfer user={user} getUser={getUser} updateUser={updateUser} />
          </Col>
          <Col key={3}>
            <Card style={{ width: "32rem" }} className="mb-2">
              <PieChart accounts={accList} />
            </Card>
          </Col>
          <Col key={4}>
            <Card border="dark" className="mb-2">
              {/* <Exchange /> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
