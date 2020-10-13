import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/signInAction";
import CheckOutSteps from "../components/checkoutsteps";
import { saveShipping } from "../actions/cartActions";
import Joi from "joi";


function ShippingScreen(props) {
  const [field, setField] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [errors, setErrors] = useState({});
  const cart = useSelector(state => state.cart);
  const { shipping } = cart;

  const dispatch = useDispatch();

  const schemaRule = {
    address: Joi.string().required(),
    city: Joi.string().required().min(2).max(255),
    postalCode: Joi.string().required().min(4).max(8),
    country: Joi.string().required().min(3).max(50)
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
    if (!error) dispatch(saveShipping(field));
    props.history.push('/payment');
  }

  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className="form">
        <h3>Shipping</h3>
        <form className="form-content" onSubmit={handleSubmit}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={field.address} name="address" onChange={handleChange}></input>
          {errors && <div className="error-message">{errors["address"]}</div>}
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={field.city} name="city" onChange={handleChange}></input>
          {errors && <div className="error-message">{errors["city"]}</div>}
          <label htmlFor="postalCode">Postal Code</label>
          <input value={field.postalCode} id="postalCode" type="text" name="postalCode" onChange={handleChange}></input>
          {errors && <div className="error-message">{errors["postalCode"]}</div>}
          <label htmlFor="country">Country</label>
          <input value={field.country} id="country" type="text" name="country" onChange={handleChange}></input>
          {errors && <div className="error-message">{errors["country"]}</div>}
          <br />
          <button onClick={handleSubmit} className="button" disabled={validate()}>Continue</button>

        </form>
      </div >
    </div>

  )
}

export default ShippingScreen;