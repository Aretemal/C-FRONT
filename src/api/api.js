import axios from 'axios';

const baseInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {},
});
const makeInstanceWithToken = (token) => axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { Authorization: token },
});
export const rouletteAPI = {
  getResult(token, selectedNumber) {
    return makeInstanceWithToken(token).post('/result/roulette', { selectedNumber });
  },
};

export const authAPI = {
  registration(data) {
    return baseInstance.post('registration', { ...data });
  },
  authentication(data) {
    return baseInstance.post('login', { ...data });
  },
};

export const profileAPI = {
  getInfoAuthUser({ token, id }) {
    return makeInstanceWithToken(token).get(`profile/user/${id}`);
  },
};

export const adminUsersAPI = {
  getAllUsersForAdmin({ token, size, page }) {
    return makeInstanceWithToken(token).put(`admin/users/read`, { size });
  },
};

export const requestUserUpdate = ({ token, data, id }) => {
  return makeInstanceWithToken(token).put(`admin/users/update`, { id, data });
};

export const requestPayments = ({ token, id }) => {
  return makeInstanceWithToken(token).get(`/admin/payments/read/${id}`);
};

export const requestGames = ({ token, id }) => {
  return makeInstanceWithToken(token).get(`/admin/games/read/${id}`);
};

export const paymentAPI = {
  getBalance({ token }) {
    return makeInstanceWithToken(token).get('/balance/read');
  },
  updateBalance({ token, amount }) {
    return makeInstanceWithToken(token).post('/balance/update', { amount });
  },
  getHistoryOfPayments({ token }) {
    return makeInstanceWithToken(token).get('/balance/allRead');
  },
};