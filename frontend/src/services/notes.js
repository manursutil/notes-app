import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, remove, getById, setToken };
