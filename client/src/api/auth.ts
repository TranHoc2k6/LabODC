import api from './axios';

export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
  }) => api.post('/auth/register', data),


  login: async (data: { email: string; password: string }) => {
  const form = new URLSearchParams();
  form.append('username', data.email);
  form.append('password', data.password);

  return api.post('/auth/login', form, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
};