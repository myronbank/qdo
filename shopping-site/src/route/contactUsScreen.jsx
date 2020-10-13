import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { contactUs } from "../actions/contactUs";
import Joi from "joi";

function ContactUsScreen(props) {
  const [field, setField] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  // const userInfo = useSelector(state => state.register);
  // const { user, loading, error } = userInfo;

  const dispatch = useDispatch();

  const schemaRule = {
    name: Joi.string().required().min(3).max(50),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      }),
    message: Joi.string().required().max(1000),

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
    if (!error) dispatch(contactUs(field));
    setSubmit(true);
  }

  useEffect(() => {
    if (submit === true) {
      window.location.reload('/contactUs');
    }
  }, [submit])

  return (
    <div className="form">
      <h3>Contact Us</h3>
      <form className="form-content" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={field.name} name="name" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["name"]}</div>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={field.email} name="email" onChange={handleChange}></input>
        {errors && <div className="error-message">{errors["email"]}</div>}
        <label htmlFor="message">Message</label>
        <textarea rows="4" content={field.text} id="message" name="message" onChange={handleChange}></textarea>
        {errors && <div className="error-message">{errors["text"]}</div>}
        <br />
        <button onClick={handleSubmit} className="button" disabled={validate()}>Submit</button>
      </form>
    </div >
  )
}

export default ContactUsScreen;