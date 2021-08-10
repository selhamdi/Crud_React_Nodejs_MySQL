import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../auth/auth";
import {  Form, Input, Button, Card} from "./loginForm";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setAuthToken } = useAuth();

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: userName,
        password,
      })
      .then((res) => {
        if (!res.data.auth) {
          setIsLoggedIn(false);
        } else {
          setAuthToken(res.data.token);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoggedIn) {
    return <Redirect to="/EtudiantsDetail" />;
  }

  return (
    <div className="App">
      <h1 style={{ marginTop: "100px"}}>Login</h1>
      <Card>
        <Form>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form>
        <Button onClick={login}>Login</Button>
        <Link to="/register">Don't have an account?</Link>
      </Card>
    </div>
  );
}

export default Login;
