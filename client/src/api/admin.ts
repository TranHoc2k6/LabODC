import axios from "./axios";

export const getPendingProjects = async () => {
  const res = await axios.get("/admin/projects/pending");
  return res.data;
};

export const validateProject = async (projectId: number) => {
  const res = await axios.post(`/admin/projects/${projectId}/validate`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get("/admin/users");
  return res.data;
};

export const getAllPayments = async () => {
  const res = await axios.get("/admin/payments");
  return res.data;
};
