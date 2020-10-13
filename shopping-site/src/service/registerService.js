import http from "./httpService";

const url = "/api/user/createAccount";

function register(input) {
  return http.post(url, input);
}

export { register };