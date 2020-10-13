import http from "./httpService";

const url = "/api/login";

function login(user) {
  return http.post(url, user);
}
export { login }

