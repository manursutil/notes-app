import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = { headers: { Authorization: token } };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (note) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, note, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const update = async (id, updatedNote) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, updatedNote, config);
  return response.data;
};

export default { setToken, getAll, create, remove, update };
