import { ajax } from "jquery";

const baseApiUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2";
const defualtParams = "?developer=VanillinT";

const fetchAsDev = async ({ method, path, params, data }) => {
  let url = baseApiUrl + path + defualtParams;

  if (params)
    Object.entries(params).forEach(([key, val]) => (url += `&${key}=${val}`));

  const response = await ajax({
    url,
    method,
    crossDomain: true,
    mimeType: "multipart/form-data",
    contentType: false,
    processData: false,
    data,
    dataType: "json",
  });

  return response;
};

const get = ({ path, params }) => {
  return fetchAsDev({ method: "GET", path, params });
};

const post = ({ path, data }) => {
  const form = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    form.append(key, val);
  });

  return fetchAsDev({ method: "POST", path, data: form });
};

export const getTasks = (params = { page: 1 }) => get({ path: "/", params });

export const createTask = (data) => post({ path: "/create", data });

export const editTask = ({ token }, task) =>
  post({ path: `/edit/${task.id}`, data: { ...task, token } });

export const editMultipleTasks = ({ token }, tasks) => {
  return Promise.all(tasks.map((task) => editTask({ token }, task)));
};

export const login = (data) => post({ path: "/login", data });
