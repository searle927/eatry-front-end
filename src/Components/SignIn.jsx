import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SignInForm from "../Components/SignInForm";



function SignIn(props) {
  const [input, setInput] = useState({ username: "", password: "" });
  const [errors, setError] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null)

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setUsername(input.username)
    props.getUserName(username)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      url: "http://localhost:4000/api/user/login",
      method: "POST",
      data: input,
    })
      .then((res) => {
        setUser({ createdItem: res.data });
        props.history.push("/sign-in");
        setError(res.data.message);
      })
      .catch(console.error);
  };

  // console.log(user)

  return (
    <div className="sign-in">
      <h1>EATR.Y</h1>
      <SignInForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
      
      <h1>
        {errors.message === "Login Successful" ? (
          <Redirect
            to={{
              pathname: "/dash",
              state: { msg: "You have signed in successfully" },
            }}
          />
        ) : (
          errors.message
        )}
      </h1>
    </div>
  );
}

export default SignIn;
