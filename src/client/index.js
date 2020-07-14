import "./styles/main.scss";
import { handleSubmit, handleDelete } from "./js/app";

// bind click event to submit button
document.querySelector("#form").addEventListener("submit", handleSubmit);

document.querySelector("#trips").addEventListener("click", (event) => {
    if (event.target.hasAttribute('data-trip-id')) {
        handleDelete(event);
    }
})
