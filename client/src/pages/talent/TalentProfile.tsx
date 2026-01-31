import { useState } from "react";
import { createTalentProfile } from "../../api/talent";
import "../../styles/talent.css";

export default function TalentProfile() {
  const [form, setForm] = useState({
    full_name: "",
    skills: "",
    bio: ""
  });

  const submit = async () => {
    try {
      if (!form.full_name || !form.skills || !form.bio) {
        alert("Please fill in all fields");
        return;
      }
      
      await createTalentProfile(form);
      alert("Profile created successfully!");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to create profile");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Talent Profile</h1>

      <div className="talent-container">
        <div className="talent-profile-form">
          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            placeholder="Skills (e.g., React, Node.js, Python)"
            value={form.skills}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
          />

          <textarea
            placeholder="Bio (Tell us about yourself)"
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

          <button onClick={submit}>Save</button>
        </div>
      </div>
    </>
  );
}