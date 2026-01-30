import { useEffect, useState } from "react";
import { getTalentProjects, getTalentEarnings } from "../../api/talent";
import "../../styles/talent.css";

export default function TalentDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [joinedCount, setJoinedCount] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Lấy available projects
      const availableProjects = await getTalentProjects();
      setProjects(availableProjects);

      // Lấy joined count
      const savedCount = localStorage.getItem("joinedCount");
      setJoinedCount(savedCount ? Number(savedCount) : 0);

      // ✨ LẤY EARNINGS THỰC TỪ API
      try {
        const earningsData = await getTalentEarnings();
        console.log("Earnings data:", earningsData);
        
        // Lấy joined project IDs để filter
        const joinedProjectIds = JSON.parse(
          localStorage.getItem("joinedProjects") || "[]"
        );
        
        // Filter payments theo projects đã join
        const myPayments = earningsData.payments.filter((p: any) =>
          joinedProjectIds.includes(p.project_id)
        );
        
        // Tính tổng earnings từ projects đã join
        const totalEarnings = myPayments.reduce(
          (sum: number, p: any) => sum + (p.team_amount || 0),
          0
        );
        
        setEarnings(totalEarnings);
        console.log("My earnings:", totalEarnings);
        console.log("My payments:", myPayments);
      } catch (error: any) {
        console.error("Error loading earnings:", error);
        // Nếu API lỗi, earnings = 0
        setEarnings(0);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

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
          <h1>${earnings.toLocaleString()}</h1>
        </div>
      </div>
    </>
  );
}