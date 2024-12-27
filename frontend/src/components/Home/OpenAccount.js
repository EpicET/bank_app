/* eslint-disable react/prop-types */
import React from "react";
import { Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function OpenAccount({ userID, openAcc }) {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("It worked!")
    );
    return (
      <Button variant="dark" onClick={decoratedOnClick} className="mb-3">
        {" "}
        {children}
      </Button>
    );
  }
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <CustomToggle eventKey="0">Open a new account</CustomToggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ListGroup>
              <ListGroup.Item action onClick={() => openAcc("Checkings")}>
                Checkings
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => openAcc("Savings")}>
                Savings
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}
