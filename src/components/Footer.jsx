/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, Row, Col, Image } from "react-bootstrap";
import "./../styles/Footer.scss";

const Footer = () => {
  return (
    <div className="footer-section">
      <Container className="section-6-container mt-5">
        <Row>
          <Col xs={12} lg={6} className="logo-col mt-3 mt-lg-0">
            <Image src="/assets/White Logo.png" alt="logo" />
            <h4 className="h4">Lawliet</h4>
          </Col>
          <Col xs={12} lg={6} className="details-col">
            <div className="product">
              <h5>Product</h5>
              <a href="#">Overview</a>
              <a href="#">Features</a>
              <a href="#">Tutorials</a>
              <a href="#">Pricing</a>
              <a href="#">Releases</a>
            </div>
            <div className="company">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Press</a>
              <a href="#">Career</a>
              <a href="#">Contact</a>
              <a href="#">Partners</a>
            </div>
            <div className="support">
              <h5>Support</h5>
              <a href="#">Help Center</a>
              <a href="#">Terms of service</a>
              <a href="#">Legal</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Status</a>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="copy-rights-div">
        <Container>
          <Row className="copy-rights-row">
            <Col
              xs={12}
              lg={6}
              className="text-center text-lg-start mb-3 mb-lg-0"
            >
              © 2021 Lawliet. All rights reserved
            </Col>
            <Col xs={12} lg={6} className="m-auto m-lg-0 ms-lg-auto">
              <Image src="/assets/Instagram Icon.png" alt="facebook" />
              <Image src="/assets/Social Icon.png" alt="social" />
              <Image src="/assets/Twitter Icon.png" alt="twitter" />
              <Image src="/assets/Youtube Icon.png" alt="youtube" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
