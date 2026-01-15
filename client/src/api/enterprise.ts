import api from "./axios";

/* ========== CREATE PROJECT ========== */
export const createProject = async (data: {
  title: string;
  description: string;
  budget: number;
  skills: string;
}) => {
  const res = await api.post("/projects", {
    title: data.title,
    description: data.description,
    requirements: data.skills,
    total_budget: Number(data.budget),
    start_date: null,
    end_date: null,
  });

  return res.data;
};

/* ========== DASHBOARD ========== */
export const getEnterpriseDashboard = async () => {
  const res = await api.get("/enterprise/dashboard");
  return res.data;
};

/* ========== PAYMENTS ========== */
export const getEnterprisePayments = async () => {
  const res = await api.get("/enterprise/payments");
  return res.data;
};
