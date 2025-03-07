import {greeting} from "./greeting.js";
import "./styles.css";
import image from "./assets/images/image.png";

const imageEl = document.createElement("img");
imageEl.src = image;

document.body.appendChild(imageEl);

console.log(greeting);