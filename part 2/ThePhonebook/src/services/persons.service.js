import axios from "axios";

const basePath = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(basePath).then((resp) => resp.data);
};

const newPerson = (newPerson) => {
  return axios.post(basePath, newPerson).then((resp) => resp.data);
};

export default {
  getAll,
  newPerson,
};
