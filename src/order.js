import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api/order';

export const createOrder = async (orderRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}`, orderRequest);
    return response.data; // Return the response data from the server
  } catch (error) {
    throw error; // Rethrow the error to be handled in the calling function
  }
};
