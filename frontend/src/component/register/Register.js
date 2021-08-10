import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Input ,h1 } from "../login/loginForm";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [isUserCreated, setUserCreated] = useState(false);

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: userName,
        password,
      })
      .then((data) => {
        console.log(data);
        if (data.data.status === 200) {
          setUserCreated(true);
        } else {
          setUserCreated(false);
        }
      })
      .catch((err) => console.log(err));
  };

  if (isUserCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <h1 style={{ marginTop: "100px"}}>Registration</h1>
      <Card>
        <Form>
          <Input type="text" placeholder="username"  onChange={(e) => setUserName(e.target.value)} />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button onClick={register}>Register</Button>
        </Form>
      </Card>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}

export default Register;
