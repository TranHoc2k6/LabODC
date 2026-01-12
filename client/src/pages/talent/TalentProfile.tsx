import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TalentProfile() {
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    api.get("/users/me").then(res => setProfile(res.data));
  }, []);

  return (
    <>
      <h1>👤 My Profile</h1>

      <label>Full name</label>
      <input value={profile.full_name || ""} readOnly />

      <label>Email</label>
      <input value={profile.email || ""} readOnly />

      <label>Role</label>
      <input value={profile.role || ""} readOnly />
    </>
  );
}
