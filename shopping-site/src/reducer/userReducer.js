import { LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, SIGN_UP_FAIL, SIGN_UP_ATTEMPT, SIGN_UP_SUCCESS } from "../constants/productConstants";


function userReducer(state = { user: {} }, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }

}

function registerReducer(state = { user: {} }, action) {
  switch (action.type) {
    case SIGN_UP_ATTEMPT:
      return { loading: true };
    case SIGN_UP_SUCCESS:
      return { loading: false, user: action.payload };
    case SIGN_UP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }

}
export { userReducer, registerReducer }; 