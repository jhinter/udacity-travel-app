async function post(path, object) {
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (response.status !== 200) {
    throw new Error("Error!");
  }
  const data = await response.json();
  return data;
}

async function get(path) {
  const response = await fetch(path, {
    method: "GET",
    credentials: "same-origin",
  });
  if (response.status !== 200) {
    throw new Error("Error!");
  }
  const data = await response.json();
  return data;
}
