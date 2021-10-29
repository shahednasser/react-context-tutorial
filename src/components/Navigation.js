import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function Navigation () {
  const {user, setUser} = useContext(UserContext);
  const [,,removeCookie] = useCookies('token');

  function logout () {
    removeCookie('token');
    setUser(null);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">React Context</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && <Link to="/login">Log In</Link>}
            {user && <Nav.Link href="#" onClick={logout}>Log Out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}