import axios from 'axios';

const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});
const makeInstanceWithToken = (token: string) => axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: token },
});
export const rouletteAPI = {
  getResult({ token, selectedNumber }: { selectedNumber: string, token: string }) {
    return makeInstanceWithToken(token).post('/result/roulette', { selectedNumber });
  },
};

export const authAPI = {
  registration(data: { firstName: string, lastName: string, email: string, login: string, password: string }) {
    return baseInstance.post('registration', { ...data });
  },
  authentication(data: { login: string, password: string }) {
    return baseInstance.post('login', { ...data });
  },
};

export const profileAPI = {
  getInfoAuthUser({ token, id }: { token: string, id: string }) {
    return makeInstanceWithToken(token).get(`profile/user/${id}`);
  },
};
