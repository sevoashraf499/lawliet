import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// components
import Modal from "./Modal";

// styles
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./../styles/NavBar.scss";

const NavBar = () => {
  const navigate = useNavigate();

  const [isSearchModalOpened, setIsSearchModalOpened] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavLinkClick = useCallback(() => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  }, [isNavbarCollapsed]);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary sticky-top">
        <Container>
          <Navbar.Brand>
            <img src="/assets/logo.png" alt="logo" />
            <span className="ms-2">Lawliet</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
          />

          <Navbar.Collapse id="basic-navbar-nav" in={!isNavbarCollapsed}>
            <Nav className="ms-md-auto me-md-5 pe-md-5">
              <Nav.Link href="/#main" onClick={handleNavLinkClick}>
                HOME
              </Nav.Link>
              <Nav.Link href="/#about" onClick={handleNavLinkClick}>
                ABOUT
              </Nav.Link>
              <Nav.Link href="/#testimonials" onClick={handleNavLinkClick}>
                TESTIMONIALS
              </Nav.Link>
              <Nav.Link href="/#contact" onClick={handleNavLinkClick}>
                CONTACT
              </Nav.Link>
              <Nav.Link
                href=""
                onClick={() => {
                  handleNavLinkClick();
                  navigate("/login");
                }}
              >
                DASHBOARD
              </Nav.Link>
              <Nav.Link
                className="d-xs-block d-md-none"
                onClick={() => {
                  handleNavLinkClick();
                  setIsSearchModalOpened(!isSearchModalOpened);
                }}
              >
                SEARCH
              </Nav.Link>
            </Nav>

            <i
              className="bi bi-search d-none d-md-block ms-md-5"
              onClick={() => setIsSearchModalOpened(!isSearchModalOpened)}
            ></i>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={isSearchModalOpened}
        onHide={() => setIsSearchModalOpened(false)}
      />
    </>
  );
};

export default NavBar;
