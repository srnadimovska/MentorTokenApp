import styles from "./Stats.module.css";
import search from "../assets/search.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer
} from "recharts";

function Stats() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [statsData, setStatsData] = useState({
  total: 0,
  assigned: 0,
  applied: 0,
  finished: 0,
});
const [chartData, setChartData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.type,
        desc: decoded.desc,
        email: decoded.email,
        phone: decoded.phone,
        skills: decoded.skills,
      });
    } catch (err) {
      console.log("Failed to decode token");
    }
  }, [token]);

  useEffect(() => {

    if (!user?.id) return;
    const fetchUser = async () => {
      

      try {
        const res = await axios.get(
          `http://localhost:11000/api/v1/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched user:", res.data.data.populateUser);
        setUser(res.data.data.populateUser);
      } catch (err) {
        console.log(err.message);
        setError("Korisnikot ne e pornajden");
      }
    };

   
fetchUser();
    
    
  }, [user?.id, token]);

  useEffect(() => {
  const fetchStats = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:11000/api/v1/application/mentor/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const apps = res.data.data; 

      setStatsData({
        total: apps.length,
        assigned: apps.filter(app => app.acceptedStatus === "in progress").length,
        applied: apps.filter(app => app.applicationType === "mentorToCompany").length,
        finished: apps.filter(app => app.acceptedStatus === "done").length,
      });

      // Group by month
      const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthlyCounts = {};

      allMonths.forEach(m => {
  monthlyCounts[m] = { month: m, done: 0, inProgress: 0, rejected: 0 };
});
      apps.forEach(app => {
        const created = new Date(app.createdAt);
        const month = created.toLocaleString("default", { month: "short" });

        if (!monthlyCounts[month]) {
          monthlyCounts[month] = { month, done: 0, inProgress: 0, rejected: 0 };
        }

        if (app.acceptedStatus === "done") {
          monthlyCounts[month].done++;
        } else if (app.acceptedStatus === "in progress") {
          monthlyCounts[month].inProgress++;
        } else if (app.acceptedStatus === "rejected") {
          monthlyCounts[month].rejected++;
        }
      });

      setChartData(Object.values(monthlyCounts));
    } catch (err) {
      console.log("Error fetching stats:", err.message);
    }
    
  };

  fetchStats();
}, [user, token]);

  const photo = user?.photo
    ? `http://localhost:11000/uploads/${user.photo}`
    : "/default.png";

    

  return (
    <>
      <div className={styles.searchDiv}>
        <div className={styles.searchArea}>
          <input type="text" placeholder="Search ..." />
          <img src={search} alt="search-icon" />
        </div>

        {user && (
          <div className={styles.userInfo}>
            <img src={photo} alt="User" className={styles.userPhoto} />
            <div className={styles.userText}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole}>{user.type}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {user && (
          <>
          <h2 className={styles.sectionTitle}>My Stats</h2>
          <div className={styles.statsWrapper}>

          <div className={styles.profileCard}>
          
            <img src={photo} alt="User" className={styles.bigPhoto} />

            <p className={styles.cardName}>{user.name}</p>
            <p className={styles.cardRole}>{user.type}</p>
            <p className={styles.cardEmail}>{user.email}</p>
            <p className={styles.cardPhone}>{user.phone}</p>
            </div>
          
          <div className={styles.aboutCard}>
            <h3>About</h3>
            <p>{user.skills}</p>
            <p>{user.desc}</p>
          </div>
          </div>
          
          <div className={styles.bottomWrapper}>
            <div className={styles.performanceCard}>
              <h3>Performance Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
  <LineChart data={chartData}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="done" stroke="green" strokeWidth={3} dot={false} />
    <Line type="monotone" dataKey="inProgress" stroke="purple" strokeWidth={3} dot={false} />
    <Line type="monotone" dataKey="rejected" stroke="red" strokeWidth={3} dot={false} />
  </LineChart>
</ResponsiveContainer>

            </div>

            <div className={styles.quickOverview}>
              <h3>Quick Overview</h3>
                <div className={styles.quickBox}>Total Jobs: {statsData.total}</div>
                <div className={styles.quickBox}>Total Assigned Jobs:{statsData.assigned}</div>
                <div className={styles.quickBox}>Jobs Applied: {statsData.applied}</div>
                <div className={`${styles.quickBox} ${styles.finishedJobs}`}>
                  Finished Jobs: {statsData.finished}
                </div>

            </div>

          </div>
          </>
        )}
      </div>
      
    </>
    
  );
}
export default Stats;
