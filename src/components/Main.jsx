import { Container, Button, Figure, Row, Col, Image } from "react-bootstrap";
import "./../styles/Main.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Main = () => {
  // const textSectionRef = useRef(null);
  const imageSectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    // tl.from(textSectionRef.current, { x: "-100%", duration: 1, delay: 0.5 });
    tl.from(
      imageSectionRef.current,
      { x: "100%", duration: 1, delay: 0.5 },
      "<"
    );
  }, []);

  return (
    <Container className="section-1-container" id="main">
      <Row>
        <Col
          className="text-section"
          xs={12}
          s={12}
          md={6}
          // ref={textSectionRef}
        >
          <div className="new-button-container mb-3 p-1">
            <Button>New</Button> Stay connected to the upcoming & Recent jobs.
          </div>

          <h1 className="display-1">
            Your Solution <br /> Legal Consultancy
          </h1>

          <h4 className="h4">
            We are here to help you take care of your <br /> legality with the
            best service especially for you.
          </h4>

          <Button className="mt-4 mb-5">GET STARTED</Button>

          <h5 className="h5 mb-3">Trusted by 10+ companies in indonesia</h5>

          <div className="d-grid ">
            <Row className="g-3">
              <Col xs={6}>
                <Image src="/assets/Airbnb Logo.png" alt="Airbnb" />
              </Col>
              <Col xs={6}>
                <Image src="/assets/Hubspot Logo.png" alt="Hubspot" />
              </Col>
              <Col xs={6}>
                <Image src="/assets/Microsoft Logo.png" alt="Microsoft" />
              </Col>
              <Col xs={6}>
                <Image src="/assets/Google Logo.png" alt="Google" />
              </Col>
            </Row>
          </div>
        </Col>

        <Col
          className="img-section position-relative z-n1"
          xs={12}
          s={12}
          md={6}
          ref={imageSectionRef}
        >
          <Figure>
            <Figure.Image
              width={811}
              height={974}
              alt="171x180"
              src="/assets/Hero.png"
            />
            <Figure.Caption className="pt-2 pb-3">
              <h4>Tiara Andiny</h4>
              <h6>-Lawyer</h6>
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
