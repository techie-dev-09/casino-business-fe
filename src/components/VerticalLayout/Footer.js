import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col>
              <div className="text-center">
                Copyright © {new Date().getFullYear()}{" "}
                <a href="https://1buy.io/" target="_blank" rel="noreferrer">
                  <b>1buy.io.</b>
                </a>{" "}
                All rights reserved.{" "}
              </div>
            </Col>
            {/* <Col sm={6}>
             
            </Col> */}
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
