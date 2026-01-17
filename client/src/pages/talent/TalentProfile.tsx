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
    await createTalentProfile(form);
    alert("Profile created");
  };

  return (
    <>
      <h1>Talent Profile</h1>

      {/* container căn giữa content */}
      <div className="talent-container">
        <div className="talent-profile-form">
          <input
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            placeholder="Skills"
            value={form.skills}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
          />

          <textarea
            placeholder="Bio"
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
