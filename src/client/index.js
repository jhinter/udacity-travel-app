import "./styles/main.scss";
import { handleSubmit } from "./js/app";

// bind click event to submit button
document.querySelector("#form").addEventListener("submit", handleSubmit);