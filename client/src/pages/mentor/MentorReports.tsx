import React, { useState } from 'react';
import { projectAPI } from '../../api/project';

export default function MentorReports() {
  const [reportData, setReportData] = useState({
    project_id: 1,
    title: '',
    content: '',
    report_type: 'monthly',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectAPI.submitReport(reportData.project_id, reportData);
      alert('Report submitted to Lab Admin');
    } catch (error) {
      alert('Failed to submit report');
    }
  };

  return (
    <div className="mentor-reports">
      <h1>Submit Report</h1>
      
      <form onSubmit={handleSubmit}>
        <select
          value={reportData.report_type}
          onChange={(e) => setReportData({ ...reportData, report_type: e.target.value })}
        >
          <option value="monthly">Monthly Report</option>
          <option value="phase">Phase Report</option>
          <option value="final">Final Report</option>
        </select>
        
        <input
          type="text"
          placeholder="Report Title"
          value={reportData.title}
          onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
        />
        
        <textarea
          placeholder="Report Content"
          value={reportData.content}
          onChange={(e) => setReportData({ ...reportData, content: e.target.value })}
        />
        
        <button type="submit">Submit to Lab</button>
      </form>
    </div>
  );
}

