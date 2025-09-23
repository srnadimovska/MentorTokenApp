import styles from "./StartupDashboard.module.css";
import search from "../assets/search.png";
import symbol from "../assets/mentorsymbol.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend
} from "recharts";

function StartupDashboard() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded user in StartupDashboard:", decoded);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        id: decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token");
      setError("Invalid token");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
        try{
            const appRes = await axios.get("http://localhost:11000/api/v1/startup/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setApps(appRes.data.data);

    const mentorRes = await axios.get("http://localhost:11000/api/v1/startup/top-mentors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMentors(mentorRes.data.data);

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const stats = {};

        appRes.data.data.forEach(app => {
        const createdAt = new Date(app.createdAt);
        const month = months[createdAt.getMonth()];
        if (!stats[month]) {
          stats[month] = { month, done: 0, rejected: 0, inprogress: 0 };
        }

        if (app.acceptedStatus === "done") stats[month].done++;
        if (app.acceptedStatus === "rejected") stats[month].rejected++;
        if (app.acceptedStatus === "in progress") stats[month].inprogress++;
      });

      
      const formatted = months.map(m => stats[m] || { month: m, done: 0, rejected: 0, inprogress: 0 });
      setChartData(formatted);

      
    

    } catch(err){
        console.log("Error fetching the data:", err.response || err.message);
        
    }finally {
        setLoading(false);
      }

    };
    fetchData();
  }, [token]);
    
  const photo = user?.photo
    ? `http://localhost:11000/uploads/${user.photo}`
    : "/default.png";

     

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!token) return <p>Please log in to view your dashboard.</p>;

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
            </div>
          </div>
        )}
      </div>

      <div className={styles.dashboardWrapper}>

      <div className={styles.jobsSection}>
        <h3>Assigned Jobs</h3>
        <div className={styles.tabs}>
    {["All", "Done", "Rejected", "In Progress"].map(tab => (
      <button
        key={tab}
        className={activeTab === tab ? styles.activeTab : ""}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {apps
    .filter(app => 
      activeTab === "All" || app.acceptedStatus.toLowerCase() === activeTab.toLowerCase()
    )
    .map(app => (
      <div key={app._id} className={styles.jobRow}>
        <span>{app.jobId.title}</span>
        <span className={`${styles.status} ${styles[app.acceptedStatus.replace(" ", "").toLowerCase()]}`}>
          {app.acceptedStatus.toUpperCase()}
        </span>
      </div>
        ))}
      </div>

      <div className={styles.mentorsSection}>
        <h3>Best Performing Mentors</h3>
        {mentors.map((m) => (
          <div key={m._id} className={styles.mentorCard}>
            <img
              src={`http://localhost:11000/uploads/${m.photo}`}
              alt={m.name}
            />
            <div className={styles.mentorInfo}>
            <span>{m.name}</span>
            <div className={styles.achievedJobs}>
            <span className={styles.number}>{m.achievedJobs}</span>
            <span>Achieved Jobs</span>
            </div>
            <span><img src={symbol} alt="mentor-symbol"/></span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bottomWrapper}>
                  <div className={styles.performanceCard}>
                    <h3>Overall Statistic</h3>
                    <h4>Overall target acomplishment over the year</h4>
                    <ResponsiveContainer width="100%" height={200}>
  <LineChart data={chartData}>
    <XAxis dataKey="month" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Line type="monotone" dataKey="done" stroke="green" strokeWidth={2} />
    <Line type="monotone" dataKey="rejected" stroke="#dc3545" strokeWidth={2} />
    <Line type="monotone" dataKey="inprogress" stroke="#6c63ff" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
      
                  </div>
      </div>
      </div>
      
    </>
  );
}
export default StartupDashboard;
