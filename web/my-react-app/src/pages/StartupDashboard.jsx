import styles from "./StartupDashboard.module.css";
import search from "../assets/search.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function StartupDashboard() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    } catch(err){
        console.log("Error fetching the data:", err.response || err.message);
        // setError('Error fetching data')
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

      <div className={styles.jobsDiv}>

      <div className={styles.section}>
        <h2>Assigned Jobs</h2>
        <div className={styles.tabs}>
                    <button>All</button>
                    <button>Done</button>
                    <button>Rejected</button>
                    <button>In Progress</button>
                  </div>
        {apps.map((app) => (
          <div key={app._id} className={styles.jobRow}>
            <span>{app.jobId.title}</span>
            <span className={`status ${app.status.toLowerCase()}`}>
              {app.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Best Performing Mentors</h2>
        {mentors.map((m) => (
          <div key={m._id} className={styles.mentorRow}>
            <img
              src={`http://localhost:11000/uploads/${m.photo}`}
              alt={m.name}
            />
            <span>{m.name}</span>
            <span>{m.achievedJobs} Achieved Jobs</span>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
export default StartupDashboard;
