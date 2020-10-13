import { setShipping } from "../service/shippingService";
import { SET_SHIPPING_ATTEMP, SET_SHIPPING_SUCCESS, SET_SHIPPING_FAIL } from "../constants/productConstants";

const setShipping = (details) => async dispatch => {
  try {
    dispatch({ type: SET_SHIPPING_ATTEMP });
    const { data } = await setShipping(details);
    dispatch({ type: SET_SHIPPING_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SET_SHIPPING_FAIL, payload: err });
  }
}

export default setShipping; 