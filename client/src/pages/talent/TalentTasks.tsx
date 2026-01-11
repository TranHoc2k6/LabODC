import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TalentTasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    api.get("/talent/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <h1>🧩 My Tasks</h1>

      <div className="tasks-grid">
        {tasks.map(t => (
          <div className="task-card" key={t.id}>
            <h3>{t.title}</h3>
            <p>{t.project}</p>
            <span className={`badge ${t.status}`}>{t.status}</span>
            <p>Deadline: {t.deadline}</p>
          </div>
        ))}
      </div>
    </>
  );
}
