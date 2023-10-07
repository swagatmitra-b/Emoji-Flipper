import emojis from "./emo";

const gameBox = document.querySelector(".populate");
const reveal = document.querySelector("#reveal");
let match = "";
let matched = [];
let last;
let current;
let timer = false;
let speed = "";
let interval;

reveal.addEventListener("click", () => revealGrid(last, current));

const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let test = [
  [0, 0],
  [0, 0],
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

grid.forEach((row, a) => {
  gameBox.innerHTML += `
    <div class="row">
    ${row
      .map(
        (_, b) => `
    <div class="card">
      <div class="card-inner">
        <div class="card-front" id="${a * grid.length + b}">
        </div>
        <div class="card-back">
        </div>
      </div>
    </div>
    `
      )
      .join("")}
    </div>
   `;
});

onload = () => {
  const backFace = Array.from(document.querySelectorAll(".card-back"));
  const frontFace = document.querySelectorAll(".card-front");
  let shuffled = shuffle([...emojis, ...emojis, ...emojis, ...emojis]);
  console.log(match);
  for (let i = 0; i < shuffled.length; i++) {
    backFace[i].innerHTML = shuffled[i];
  }
  frontFace.forEach((front) => {
    front.addEventListener("click", (e) => clicker(e));
  });
  backFace.forEach((back) => {
    back.addEventListener("click", (e) =>
      console.log(e.target.getAttribute("id"))
    );
  });
};

function clicker(e) {
  let id = e.target.getAttribute("id");
  e.target.parentElement.parentElement.classList.add("flip-now");
  e.target.parentElement.classList.add("flip-now");
  console.log(id);
  if (!timer) dealTimer("start");
  if (!match) {
    match = e.target.nextElementSibling.innerText;
    last = e.target;
  } else {
    if (match == e.target.nextElementSibling.innerText) {
      current = e.target;
      match = "";
      matched.push(current, last);
      last = 0;
    } else {
      current = e.target;
      match = "";
      setTimeout(() => reflip(current, last), 900);
    }
  }
  console.log(match, last, matched);
}

function reflip(first, second) {
  first.parentElement.classList.remove("flip-now");
  first.parentElement.parentElement.classList.remove("flip-now");
  second.parentElement.classList.remove("flip-now");
  second.parentElement.parentElement.classList.remove("flip-now");
}

function revealGrid(first, second) {
  let cards = Array.from(document.querySelectorAll(".card-front"));
  let set = new Set();
  console.log(matched);
  cards.forEach((target) => {
    if (!matched.includes(target.getAttribute("id")) && !set.has(target)) {
      target.parentElement.parentElement.classList.add("flip-now");
      target.parentElement.classList.add("flip-now");
      set.add(target);
    } else console.log(target);
  });
  setTimeout(() => {
    cards.forEach((target) => {
      if (!matched.includes(target)) {
        target.parentElement.parentElement.classList.remove("flip-now");
        target.parentElement.classList.remove("flip-now");
      } else console.log(target);
    });
  }, 2500);
}

function dealTimer(signal) {
  signal == "start" ? (timer = true) : (timer = false);

  if (timer) {
    const startTime = new Date();
    interval = setInterval(() => clock(startTime), 10);
  } else {
    clearInterval(interval);
  }
}

function clock(now) {
  let newNow = new Date();
  let inSeconds = (newNow - now) / 1000;
  let minutes = Math.floor(inSeconds / 60) % 60;
  let seconds = Math.floor(inSeconds) % 60;
  let milliseconds = String(inSeconds).split(".")[1];

  if (matched.length == grid.flat().length) {
    dealTimer("stop");
    console.log(speed);
  }

  if (minutes == 0) speed = seconds + "." + milliseconds + " seconds";
  else
    speed =
      minutes +
      " minutes " +
      "and " +
      seconds +
      "." +
      milliseconds +
      " seconds";
}
