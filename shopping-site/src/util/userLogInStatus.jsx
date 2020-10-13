import Cookie from "js-cookie";

export default function isLogIn() {
  return Cookie.getJSON('userInfo') || null;
}