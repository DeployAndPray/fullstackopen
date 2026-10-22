import axios from "axios";

const basePath = "/api/persons";

const getAll = () => {
  return axios.get(basePath).then((resp) => resp.data);
};

const newPerson = (newPerson) => {
  return axios.post(basePath, newPerson).then((resp) => resp.data);
};

const deletePerson = (id) => {
  return axios.delete(`${basePath}/${id}`).then((resp) => resp.data);
};

const updateNumber = (id, newData) => {
  return axios.put(`${basePath}/${id}`, newData).then((resp) => resp.data);
};

export default {
  getAll,
  newPerson,
  deletePerson,
  updateNumber,
};
