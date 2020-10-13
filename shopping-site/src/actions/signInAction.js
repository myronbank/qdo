import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAIL, SIGN_UP_ATTEMPT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../constants/productConstants";
import { register } from "../service/registerService";
import { login } from "../service/authService";
import Cookie from "js-cookie";

const loginUser = (input) => async (dispatch) => {
  dispatch({ type: LOGIN_ATTEMPT });
  try {
    const { data } = await login(input);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
}

const registerUser = (input) => async (dispatch) => {
  dispatch({ type: SIGN_UP_ATTEMPT });
  try {
    const { data } = await register(input);
    dispatch({ type: SIGN_UP_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SIGN_UP_FAIL, payload: error.message });
  }
}

export { loginUser, registerUser }; 