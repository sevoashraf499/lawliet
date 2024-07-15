import { Container, Row, Col, Image } from "react-bootstrap";
import "./../styles/About.scss";

const About = () => {
  return (
    <Container className="section-2-container" id="about">
      <Row>
        <Col xs={12} xl={6} className="question-col">
          <h1 className="display-5 mb-4 text-center text-xl-start">
            Why do we help <br /> with legalization?
          </h1>
          <h5 className="h5 mb-4 text-center text-xl-start">
            We are here for UMKM in Indonesia <br /> to carry out the
            legalization process, <br /> which is sometimes complicated.
          </h5>
        </Col>

        <Col xs={12} xl={6} className="cards-col">
          <Row className="">
            <Col xs={12} md={6} lg={6} className="card">
              <Image src="/assets/Circle Layer.png" alt="Circles" />
              <h5>
                Environmental <br /> Law
              </h5>
              <span>
                Environmental legal issues might occur since the planned
                business activities are designed.
              </span>
            </Col>
            <Col xs={12} md={6} lg={6} className="card">
              <Image src="/assets/Bag.png" alt="Bag" />
              <h5>Corporate and Commercial</h5>
              <span>
                We provide a complete range of services for the continuity of
                your business activities.
              </span>
            </Col>
            <Col xs={12} md={6} lg={6} className="card">
              <Image src="/assets/Rocket.png" alt="Rocket" />
              <h5>Information and Technology</h5>
              <span>
                IT not followed by the existing regulation which might cause
                legal uncertainty and business uncertainty.
              </span>
            </Col>
            <Col xs={12} md={6} lg={6} className="card">
              <Image src="/assets/User Arrows.png" alt="Users" />
              <h5>Other Services</h5>
              <span>
                In dealing with disruptive economic and legal challenge, our
                firm also provide various legal services.
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
