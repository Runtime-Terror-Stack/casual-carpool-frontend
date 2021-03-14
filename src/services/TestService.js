import Axios from "axios";

// const port = 6969;
const baseUrl = "http://localhost:6969";
const basePath = "bitches";

const getAll = async () => {
  const response = await Axios.get(`${baseUrl}/${basePath}`);
  console.log(response.data);
  return response.data;
};

const getById = async (id) => {
  const id1 = 2;
  const response = await Axios.get(`${baseUrl}/${basePath}/${id1}`);
  console.log(response.data);
  return response.data;
};

const addValue = async (value) => {
  const value1 = { id: 4, name: "abhirup" };
  const response = await Axios.post(`${baseUrl}/${basePath}`, value1);
  console.log(response.data);
  return response.data;
};

const updateValue = async (value) => {
  const value1 = { id: 2, name: "abhirup" };
  const response = await Axios.put(`${baseUrl}/${basePath}`, value1);
  console.log(response.data);
  return response.data;
};

const deleteValue = async (id) => {
  const id1 = 3;
  const response = await Axios.delete(`${baseUrl}/${basePath}/${id1}`);
  console.log(response.data);
  return response.data;
};

export default {
  getAll,
  getById,
  addValue,
  updateValue,
  deleteValue,
};
