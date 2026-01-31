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

      // ✨ LẤY EARNINGS VÀ JOINED COUNT TỪ API
      try {
        const earningsData = await getTalentEarnings();
        console.log("Earnings data:", earningsData);
        
        // ✨ DÙNG JOINED_COUNT TỪ BACKEND
        if (earningsData.joined_count !== undefined) {
          setJoinedCount(earningsData.joined_count);
          localStorage.setItem("joinedCount", earningsData.joined_count.toString());
        }
        
        // ✨ LẤY PROJECT IDS TỪ PAYMENTS VÀ SYNC VÀO LOCALSTORAGE
        const projectIdsFromPayments = earningsData.payments.map((p: any) => p.project_id);
        
        // Lấy localStorage hiện tại
        let joinedProjectIds = JSON.parse(
          localStorage.getItem("joinedProjects") || "[]"
        );
        
        // ✨ MERGE: Kết hợp localStorage + payments để không mất data
        const allProjectIds = [...new Set([...joinedProjectIds, ...projectIdsFromPayments])];
        
        // Lưu lại vào localStorage
        if (allProjectIds.length > 0) {
          localStorage.setItem("joinedProjects", JSON.stringify(allProjectIds));
          joinedProjectIds = allProjectIds;
        }
        
        console.log("Joined project IDs:", joinedProjectIds);
        console.log("Joined count from backend:", earningsData.joined_count);
        
        // ✨ TÍNH EARNINGS
        if (joinedProjectIds.length === 0) {
          // Dùng tổng earnings từ API
          setEarnings(earningsData.total_earnings || 0);
          console.log("Using total earnings (no project IDs):", earningsData.total_earnings);
        } else {
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
          console.log("My earnings (filtered):", totalEarnings);
          console.log("My payments:", myPayments);
        }
      } catch (error: any) {
        console.error("Error loading earnings:", error);
        const savedCount = localStorage.getItem("joinedCount");
        setJoinedCount(savedCount ? Number(savedCount) : 0);
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