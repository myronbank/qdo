import { SET_SHIPPING_ATTEMP, SET_SHIPPING_SUCCESS, SET_SHIPPING_FAIL } from "../constants/productConstants";

function shippingReducer(state = {}, action) {
  switch (action.type) {
    case SET_SHIPPING_ATTEMP:
      return { loading: true };

    case SET_SHIPPING_SUCCESS:
      return { loading: false, details: action.payload };

    case SET_SHIPPING_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export { shippingReducer };