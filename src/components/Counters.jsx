import { useState, useEffect } from "react";

// styles
import { Container, Row, Col } from "react-bootstrap";
import "./../styles/Counters.scss";

const Counters = () => {
  const [clientsCounter, setClientsCounter] = useState(0);
  const [businessCounter, setBusinessCounter] = useState(0);
  const [yearsCounter, setYearsCounter] = useState(0);
  const [intervalsSet, setIntervalsSet] = useState(false);

  useEffect(() => {
    let debounceTimer;
    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (window.scrollY > 1400 && !intervalsSet) {
          setIntervalsSet(true);

          const clientsInterval = setInterval(() => {
            setClientsCounter((prev) => {
              if (prev < 30) return prev + 1;
              clearInterval(clientsInterval);
              return prev;
            });
          }, 67); // Faster interval for clients

          const yearsInterval = setInterval(() => {
            setYearsCounter((prev) => {
              if (prev < 8) return prev + 1;
              clearInterval(yearsInterval);
              return prev;
            });
          }, 250); // Faster interval for years

          const businessInterval = setInterval(() => {
            setBusinessCounter((prev) => {
              if (prev < 300) return prev + 1;
              clearInterval(businessInterval);
              return prev;
            });
          }, 7); // Slower interval for business
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [clientsCounter, businessCounter, yearsCounter, intervalsSet]);

  return (
    <Container fluid className="section-3-container">
      <div className="text-container pb-5">
        <h1 className="display-5 mb-3">Some count that matters</h1>
        <h6 className="h6">
          Our achievement in the journey depicted in numbers.
        </h6>
      </div>

      <div className="d-grid">
        <Row>
          <Col xs={12} sm={4} className="py-3 py-sm-0">
            <h1 className="display-5">{clientsCounter}</h1>
            <h6 className="h6">Clients</h6>
          </Col>
          <Col xs={12} sm={4} className="py-3 py-sm-0">
            <h1 className="display-5">{businessCounter}+</h1>
            <h6 className="h6">Taken business legalities</h6>
          </Col>
          <Col xs={12} sm={4} className="py-3 py-sm-0">
            <h1 className="display-5">{yearsCounter}</h1>
            <h6 className="h6">Years of Journeys</h6>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Counters;
