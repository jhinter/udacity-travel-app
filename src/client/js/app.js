async function handleSubmit() {
  console.log("submit is handled...");
  if (!validateForm()) {
    alert("Attention: Your Input isn't valid!");
    return;
  }

  try {
    // TODO
    // sending requests
    // updating ui
  } catch (error) {
    console.log(error);
  }
}

function validateForm() {
  // TODO
  return true;
}

function updateUI() {
  // TODO
}

export { handleSubmit };
