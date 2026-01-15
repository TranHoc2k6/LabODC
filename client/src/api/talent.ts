import axios from "./axios";

export const createTalentProfile = async (data: {
  full_name: string;
  skills: string;
  bio: string;
}) => {
  const res = await axios.post("/talent/profile", data);
  return res.data;
};

export const getTalentProjects = async () => {
  const res = await axios.get("/talent/projects");
  return res.data;
};

export const joinProject = async (projectId: number) => {
  const res = await axios.post(`/talent/projects/${projectId}/join`);
  return res.data;
};
