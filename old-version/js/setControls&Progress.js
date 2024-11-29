import { FontColorToast } from "./modules/toasts.js";

const custom = document.getElementById("toCustom");
const image = document.getElementById("imgChange");
const texts = document.getElementById("texts");
const ctrls = document.getElementById("ctrls");
const buttons = document.getElementById("buttons");
const imageChange = document.getElementById("file-input-container");

let showCustomOptions = false;
let showImageButton = false;

custom.addEventListener("click", () => {
  showCustomOptions = !showCustomOptions;

  if (showCustomOptions) {
    buttons.style.display = "block";
  } else {
    buttons.style.display = "none";
  }
});

image.addEventListener("click", () => {
  showImageButton = !showImageButton;

  if (showImageButton) {
    imageChange.style.display = "block";
  } else {
    imageChange.style.display = "none";
  }
});

texts.addEventListener("click", () => {
  FontColorToast("class", "txt");
});

ctrls.addEventListener("click", () => {
  FontColorToast("id", "controls");
});
