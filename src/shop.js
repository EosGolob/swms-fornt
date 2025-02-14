import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api';


export const checkShopDetails = (gstId) => {
  return axios
  .get(`${BASE_URL}/shop/checkShopId/${gstId}`)
  .then((response) => {
    return response.data;   
  }).catch((error) => {
     throw error;
  });
};