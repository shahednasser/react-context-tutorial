import { useContext } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import UserContext from "../UserContext";

export default function Home () {
  const {user} = useContext(UserContext);
  return (
    <>
      <Navigation />
      <Container>
        {!user && <h1>You're not logged in</h1>}
        {user && <h1>You're logged in with {user.token}</h1>}
      </Container>
    </>
  );
}