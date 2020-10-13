import { submitForm } from "../service/submitFormService";
import { CONTACT_US_SUCCESS, CONTACT_US_SUBMITTED, CONTACT_US_FAIL } from '../constants/productConstants';

const contactUs = (field) => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_SUBMITTED });
    const data = await submitForm(field);
    dispatch({ type: CONTACT_US_SUCCESS, payload: data });
    console.log(data);
  } catch (err) {
    dispatch({ type: CONTACT_US_FAIL, payload: err });
  }
}

export { contactUs };
