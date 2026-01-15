import React, { useState } from 'react';
import { projectAPI } from '../../api/project';

export default function MentorProjects() {
  const [selectedProject] = useState<number>(1);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assigned_to: 0,
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectAPI.createTask(selectedProject, taskData);
      alert('Task created using Excel template');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  return (
    <div className="mentor-projects">
      <h1>Manage Projects</h1>
      
      <section>
        <h2>Create Task</h2>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
          
          <textarea
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
          
          <button type="submit">Create Task (Excel Template)</button>
        </form>
      </section>
    </div>
  );
}
