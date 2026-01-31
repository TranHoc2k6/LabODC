import axios from "axios";

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    axios.post(
      "http://localhost:8000/auth/login",
      new URLSearchParams({
        username: data.email,
        password: data.password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ),

  register: (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
  }) =>
    axios.post("http://localhost:8000/auth/register", data),
};
