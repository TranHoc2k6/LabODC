import api from './axios';

export const paymentAPI = {
  create: (data: {
    project_id: number;
    amount: number;
    payment_method: string;
  }) => api.post('/payments', data),
  
  getAll: () => api.get('/admin/payments'),
  
  requestHybridSupport: (projectId: number) =>
    api.post(`/payments/hybrid-support/${projectId}`),
};