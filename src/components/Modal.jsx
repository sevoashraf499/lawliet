import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "./../styles/Modal.scss";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Search 😁</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs="auto mt-3 mb-3">
              <Form.Control type="text" placeholder="Search..." />
            </Col>
            <Col xs="auto mt-3 mb-3">
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
