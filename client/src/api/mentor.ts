import axios from './axios';

export const getMentorDashboard = () =>
  axios.get('/mentor/dashboard');

export const getMentorProjects = () =>
  axios.get('/mentor/projects');

export const submitMentorReport = (data: any) =>
  axios.post('/mentor/reports', data);
