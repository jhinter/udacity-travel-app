async function postRequest(path, object) {
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

async function getRequest(path) {
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

async function deleteRequest(path, id) {
  const response = await fetch(`${path}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (response.status !== 200) {
    throw new Error("Error!");
  }
  const data = await response.json();
  return data;
}

export { getRequest, postRequest, deleteRequest };
