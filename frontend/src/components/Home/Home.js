import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosConfig";
import Transfer from "../Transactions/Transfer";
import AccList from "./AccList";
import Header from "./Header";
import "./Home.css";
import OpenAccount from "./OpenAccount";
import PieChart from "./PieChart";

const Home = () => {
  const [user, setUser] = useState([]);
  const { userID } = useParams(); // This is the userID from the URL
  const [password, setPassword] = useState();
  const [accList, setAccList] = useState([]);
  const [error, setError] = useState();

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  function openAcc(type) {
    if( accList.length >= 3){
      setError("You can only have 3 accounts");
      return;
    }

    api
      .post(`/api/v1/user/${userID}/${type}`) // Returns a string
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const getUser = () => { // Returns a user
      api
        .get(`/api/v1/user/${userID}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUser();
  }, [userID]); // Eventually will need to update page when accList changes


  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        if (key === "password") {
          setPassword(value);
        } else if (key === "accountList") {
          setAccList(value);
        }
      });
    }
    // console.log(user);
  }, [user]);

  return (
    <div className="Home">
      <Header userID={userID} password={password} />
      <Container>
        <Row className="mb-5">
          <h2>Welcome {userID}</h2>
        </Row>
        <Row xs={1} md={2} lg={2} className="g-4">
          {/* Lists Accounts and provides open account options */}
          <Col key={1}>
            <Card border="dark">
              <AccList userID={userID} accList={accList} />
              <OpenAccount userID={userID} openAcc={openAcc} setError={setError} setUser={setUser} />
              {error && <Alert className="" variant="danger">{error}</Alert>}
            </Card>
          </Col>
          <Col key={2}>
            <Transfer user={user} updateUser={updateUser} />
          </Col>
          <Col key={3}>
            <Card style={{ width: "32rem" }} className="mb-2">
              <PieChart accounts={accList} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
