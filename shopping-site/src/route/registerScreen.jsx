import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/signInAction";
import Joi from "joi";
import { Link } from "react-router-dom";


function RegisterScreen(props) {
  const [field, setField] = useState({ name: "", email: "", password: "", repassword: "" });
  const [errors, setErrors] = useState({});
  const userInfo = useSelector(state => state.register);
  const { user, loading, error } = userInfo;
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const schemaRule = {
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      }),
    password: Joi.string().required().min(6).max(255),
    repassword: Joi.string().required().min(6).max(255),
    name: Joi.string().required().min(3).max(50)
  }

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schemaRule).validate(field, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  const validateField = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: schemaRule[name] };
    const { error } = Joi.object(schema).validate(obj);
    if (!error) return null;
    return error.details[0].message;
  }

  const handleChange = ({ target: inputField }) => {
    const error = {};
    const errorMessage = validateField(inputField.name, inputField.value);
    if (errorMessage) error[inputField.name] = errorMessage;
    else delete errors[inputField.name];

    const newField = { ...field };
    newField[inputField.name] = inputField.value;
    setField(newField);
    setErrors(error);

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) console.log("not validated");
    if (!error) dispatch(registerUser(field));
  }

  useEffect(() => {
    if (user) {
      window.location = redirect;
    }
  }, [userInfo])

  return (
    <div className="form">
      <h3>Sign Up</h3>
      {loading && <div>loading...</div>}
      {error && <div>error</div>}
      <form className="form-content" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={field.name} name="name" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["name"]}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={field.email} name="email" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["email"]}</div>}
        <label htmlFor="password">Password</label>
        <input value={field.password} id="password" type="password" name="password" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["password"]}</div>}
        <label htmlFor="repassword">confirm password</label>
        <input value={field.repassword} id="repassword" type="password" name="repassword" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["repassword"]}</div>}
        <br />
        <button onClick={handleSubmit} className="button" disabled={validate()}>Sign Up</button>
        <p>Already got an account?</p>
        <button className="button">
          <Link to={redirect === "/" ? "signin" : "/signin?redirect=" + redirect}>Create Account</Link></button>
      </form>
    </div >
  )
}

export default RegisterScreen;