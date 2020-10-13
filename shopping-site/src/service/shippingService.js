import http from "./httpService";

const url = "/api/user/setShipping";

function setShipping(details) {
  return http.post(url, details);
}

export { setShipping }