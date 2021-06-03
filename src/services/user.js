import api from "./api";

export async function login(data) {
  const response = await api.post("/api/users/login", data);
  const { user, error } = response.data;

  if (error) return { error };

  localStorage.setItem("authUser", JSON.stringify(user));
  return { user };
}

export async function createUser(data) {
  const response = await api.post("/api/users/create", data);

  const { user, error } = response.data;
  if (error) return { error };

  localStorage.setItem("authUser", JSON.stringify(user));
  return { user };
}

export async function updateUser(data) {
  const response = await api.put("/api/users", data);
  const { user, error } = response.data;

  if (error) return { error };

  localStorage.setItem("authUser", JSON.stringify(user));
  return { user };
}

export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    // 'user name ' => ''user%20name
    let encodedValue = encodeURIComponent(params[property]);
    // aakash 123 => aakash%123
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&"); //'username=aakash&password=123'
}
