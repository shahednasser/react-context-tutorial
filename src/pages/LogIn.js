import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import Navigation from "../components/Navigation";
import UserContext from "../UserContext";


export default function LogIn () {
  const [email, setEmail] = useState("george.bluth@reqres.in");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies('token');
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
  const buttonRef = useRef(null);

  useEffect(() => {
    //check if user is logged in or not
    if (user !== null) {
      //redirect home
      history.push('/');
    }
  }, [history, user]);

  function handleSubmit (event) {
    event.preventDefault();
    buttonRef.current.disabled = true;
    
    //login user
    axios.post('https://reqres.in/api/login', {email, password})
    .then(({data}) => {
      //set token in local storage
      setCookie('token', data.token);
      setUser({
        email,
        password,
        token: data.token
      });
    })
    .catch((err) => {
      console.error(err);
      alert('An error occurred, please try again later.');
      buttonRef.current.disabled = false;
    })
  }

  return (
    <>
      <Navigation />
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <h1>Log In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" ref={buttonRef}>
          Submit
        </Button>
      </Form>
    </>
  )
}