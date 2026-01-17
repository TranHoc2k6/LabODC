import React, { useEffect, useState } from 'react';
import { projectAPI } from '../../api/project';
import '../../styles/mentor.css';

export default function MentorReports() {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null);

  const [reportData, setReportData] = useState({
    title: '',
    content: '',
    report_type: 'monthly',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await projectAPI.getMentorProjects();
    setProjects(res.data);
    if (res.data.length > 0) {
      setProjectId(res.data[0].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    try {
      await projectAPI.submitReport(projectId, reportData);
      alert('Report submitted successfully');
      setReportData({
        title: '',
        content: '',
        report_type: 'monthly',
      });
    } catch {
      alert('Failed to submit report');
    }
  };

  return (
    <div className="mentor-reports">
      <h1>Submit Mentor Report</h1>

      <form onSubmit={handleSubmit}>
        {/* Project */}
        <select
          value={projectId ?? ''}
          onChange={(e) => setProjectId(Number(e.target.value))}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          value={reportData.report_type}
          onChange={(e) =>
            setReportData({ ...reportData, report_type: e.target.value })
          }
        >
          <option value="monthly">Monthly</option>
          <option value="phase">Phase</option>
          <option value="final">Final</option>
        </select>

        <input
          type="text"
          placeholder="Report Title"
          value={reportData.title}
          onChange={(e) =>
            setReportData({ ...reportData, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Report Content"
          value={reportData.content}
          onChange={(e) =>
            setReportData({ ...reportData, content: e.target.value })
          }
          required
        />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
