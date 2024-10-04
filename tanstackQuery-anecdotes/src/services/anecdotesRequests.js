import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (object) => {
  const res = await axios.post(baseUrl, object);
  return res.data;
};

export const updateAnecdote = (object) => {
  const url = `${baseUrl}/${object.id}`;
  return axios.put(url, object).then((res) => res.data);
};
