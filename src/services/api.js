import axios from "axios";

const API_BASE_URL = "https://fullstack-test-navy.vercel.app/api";

export const createUser = (userData) => {
  return axios.post(`${API_BASE_URL}/users/create`, userData)
    .then(response => {
      return {
        data: {
          message: "User account successfully created"
        }
      };
    })
    .catch(error => {
      throw error;
    });
};