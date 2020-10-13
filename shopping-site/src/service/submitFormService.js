import http from "./httpService";

const url = "/api/contactUs"

function submitForm(body) {
  return http.post(url, body);
}

export { submitForm }