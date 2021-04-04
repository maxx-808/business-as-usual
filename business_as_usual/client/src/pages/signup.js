import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
        await
    }
  };
  return <div></div>;
};
