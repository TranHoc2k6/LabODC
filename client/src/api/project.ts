import api from './axios';

export const projectAPI = {
  // Enterprise
  create: (data: any) => api.post('/projects', data),
  getAll: (status?: string) => 
    api.get('/projects', { params: status ? { status } : {} }),
  
  // Talent
  getAvailable: () => api.get('/talent/projects'),
  join: (projectId: number) => api.post(`/talent/projects/${projectId}/join`),
  
  // Mentor
  getMentorProjects: () => api.get('/mentor/projects'),
  createTask: (projectId: number, data: any) =>
    api.post(`/mentor/projects/${projectId}/tasks`, data),
  submitReport: (projectId: number, data: any) =>
    api.post(`/mentor/projects/${projectId}/reports`, data),
  
  // Admin
  getPending: () => api.get('/admin/projects/pending'),
  validate: (projectId: number) => api.post(`/admin/projects/${projectId}/validate`),
};