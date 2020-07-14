import { updateUI } from "./ui";
import { handleSubmit, handleDelete } from "./handlers";

function init() {
  // bind click event to submit button
  document.querySelector("#form").addEventListener("submit", handleSubmit);

  document.querySelector("#trips").addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-trip-id")) {
      handleDelete(event);
    }
  });

  // updating ui once at startup
  updateUI();
}

export { init };
