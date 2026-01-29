import { useEffect, useState } from "react";
import { getTalentProjects } from "../../api/talent";
import "../../styles/talent.css";

export default function TalentDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [joinedCount, setJoinedCount] = useState<number>(0);

  useEffect(() => {
    getTalentProjects().then(setProjects);

    const savedCount = localStorage.getItem("joinedCount");
    if (savedCount) {
      setJoinedCount(Number(savedCount));
    }
  }, []);


  useEffect(() => {
    getTalentProjects().then(setProjects);
  }, []);

  return (
    <>
      <h1>Talent Dashboard</h1>

      <div className="talent-cards">
        <div className="talent-card">
          <h3>Available Projects</h3>
          <h1>{projects.length}</h1>
        </div>

        <div className="talent-card">
          <h3>Joined Projects</h3>
          <h1>{joinedCount}</h1>
        </div>

        <div className="talent-card">
          <h3>Earnings</h3>
          <h1>$0</h1>
        </div>
      </div>
    </>
  );
}
