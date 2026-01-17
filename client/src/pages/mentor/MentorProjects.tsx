import React, { useEffect, useState } from 'react';
import { projectAPI } from '../../api/project';
import '../../styles/mentor.css';

export default function MentorProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assigned_to: 0,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await projectAPI.getMentorProjects();
    setProjects(res.data);
    if (res.data.length > 0) {
      setSelectedProject(res.data[0].id);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      await projectAPI.createTask(selectedProject, taskData);
      alert('Task created successfully');
      setTaskData({ title: '', description: '', assigned_to: 0 });
    } catch {
      alert('Failed to create task');
    }
  };

  return (
    <div className="mentor-projects">
      <h1>Manage Projects</h1>

      {/* Select project */}
      <select
        value={selectedProject ?? ''}
        onChange={(e) => setSelectedProject(Number(e.target.value))}
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      {/* Create Task */}
      <section>
        <h2>Create Task (Excel Template)</h2>

        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Task Description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            required
          />

          <button type="submit">Create Task</button>
        </form>
      </section>
    </div>
  );
}
