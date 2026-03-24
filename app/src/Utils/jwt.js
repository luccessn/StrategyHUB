// export function isTokenValid(token) {}
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  const currentTime = Date.now() / 1000;
  const Decode = jwtDecode(token);
  return Decode.exp > currentTime;
};

export const toggleLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("accesTokenHUB", token);
  } else {
    localStorage.removeItem("accesTokenHUB");
  }
};
