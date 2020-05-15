import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const logoutButton = document.getElementById("jsLogout");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
  const socket = io("/");
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  if (!value || value.trim() === "") {
    return alert("닉네임을 입력하셔야합니다.");
  }
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  return location.reload();
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(NICKNAME);
    return location.reload();
  });
}

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}
