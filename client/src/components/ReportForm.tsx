import React, { useState } from 'react';

interface ReportFormProps {
  projectId: number;
  onSubmit: (data: any) => void;
}

export default function ReportForm({ projectId, onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    report_type: 'monthly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, project_id: projectId });
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <select
        value={formData.report_type}
        onChange={(e) => setFormData({ ...formData, report_type: e.target.value })}
      >
        <option value="monthly">Monthly Report</option>
        <option value="phase">Phase Report</option>
        <option value="final">Final Report</option>
      </select>

      <input
        type="text"
        placeholder="Report Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Report Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      />

      <button type="submit">Submit Report</button>
    </form>
  );
}