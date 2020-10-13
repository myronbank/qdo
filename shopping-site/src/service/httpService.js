import axios from "axios";
import Cookie from "js-cookie";

axios.interceptors.response.use(null, error => {
  const expectedError = error.res && error.res.status >= 400 && error.res.status < 500;
  if (!expectedError)
    console.log("there has been an unknown error", error);

  return Promise.reject(error);
})

// warning says i need to wrap the selector in stateless function 
if (Cookie.getJSON('userInfo')) {
  axios.defaults.headers.common['Authorization'] = Cookie.getJSON('userInfo')["token"];
}
// axios.defaults.headers.common['Authorization'] = useSelector(state => state.userInfo).user.token;
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}