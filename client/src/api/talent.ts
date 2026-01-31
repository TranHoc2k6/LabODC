import axios from "./axios";

export const createTalentProfile = async (data: {
  skills: string;
  bio: string;
}) => {
  const res = await axios.post("/talent/profile", {
    skills: data.skills,
    bio: data.bio
  });
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

export const getProjectTasks = async (projectId: number) => {
  const res = await axios.get(`/talent/projects/${projectId}/tasks`);
  return res.data;
};

// ✨ API MỚI: Lấy earnings của talent
export const getTalentEarnings = async () => {
  const res = await axios.get("/talent/earnings");
  return res.data;
};