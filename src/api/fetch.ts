import { getCookie } from "typescript-cookie";
import { isLoggedIn, logout } from "../services/AuthService";

interface response {
  status: boolean;
  message: string;
}

function makeResponse(http: XMLHttpRequest): response {
  const res = {
    status: true,
    message: http.responseText,
  };
  if (http.status > 300) {
    res.status = false;
  }
  if (http.status === 401) {
    logout();
  }
  return res;
}

export default function sendRequest(url: string, type: string, body: string): Promise<response> {
  return new Promise<response>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const res = makeResponse(xhr);
      resolve(res);
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(body);
  });
}

export async function sendRequest_(url: string, type: string,body: string) {
  const response = await fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  return await response.json();
}