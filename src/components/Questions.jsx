import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./../styles/Questions.scss";

const Questions = () => {
  return (
    <Container className="section-5-container" id="contact">
      <Row>
        <Col md={8} className="text-col">
          <h1 className="display-5">Complex Questions?</h1>
          <h4 className="h4">
            Request for a personalized budget for your legal problem. We will
            send you a couple of options in 24 hours. You can have a free
            consultation if you're our first customer.
          </h4>
          <Button>
            <i className="bi bi-telephone-fill"></i> Call now
          </Button>
        </Col>

        <Col md={4} className="img-col d-none d-md-block">
          <Image src="/assets/Complex Questions.png" alt="person calling" />
        </Col>
      </Row>
    </Container>
  );
};

export default Questions;
