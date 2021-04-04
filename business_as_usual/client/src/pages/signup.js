import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  //sets the form in state when inputs change
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //submit function to complete register with backend
  const submit = async (e) => {
    e.preventDefault();

    try {
      //register call to backend
      await axios.post("/api/accounts/register", form);
      // once registered successfully, user will be sent in with login as well
      const { data } = await axios.post("api/accounts/login", {
        email: form.email,
        password: form.password,
      });

      //puts auth token in localStorage for use throughout the auth token life
      localStorage.setItem("auth-token", data.token);

      history.push("/");
    } catch (err) {
      console.log(err.response);

      //err handling to push errors onto screen
      const regErr = document.getElementById("registerErr");
      regErr.innerHTML = err.response.data.msg;
      regErr.classList.remove("hidden");
      regErr.classList.add("err");
    }
  };
  return <div></div>;
};
