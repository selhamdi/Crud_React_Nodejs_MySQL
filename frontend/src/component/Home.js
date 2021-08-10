import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./auth/auth";
import { Item, Grid } from "./login.css";
import axios from "axios";

function Home() {
  const { authToken } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3001/", {
        headers: {
          "x-access-token": authToken,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
            console.log('good')
        } else {
            console.log('baad')

        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <Grid>
     
      </Grid>
    </div>
  );
}

export default Home;
