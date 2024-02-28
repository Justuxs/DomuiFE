import { getCookie, setCookie } from "typescript-cookie";

export function logIn( email: string) {
  const time = new Date();
  time.setHours(time.getHours() + 1);
  setCookie("user", email, time);
}

export function clearToken() {
  document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function logout() {
  clearToken();
  document.location.href = "/login";
}
export const isLoggedIn =getCookie("user"); //true;//!!getCookie("user");

export const getUser = (): string => {
  if(isLoggedIn) return <string> getCookie("user");
  logout();
  return "";
};
export const isUser = (email: string): boolean => {
  return getCookie("user") === email;
};
