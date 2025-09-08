import styles from "./MentorDashboard.module.css";
import search from "../assets/search.png";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function MentorDashboard() {
  const [user, setUser] = useState(null);
  const [assigned, setAssigned] = useState([]);
  const [pending, setPending] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.userType,
        id:decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token");
    }
  }, [token]);

  const photo = user?.photo
    ? `http://localhost:11000/uploads/${user.photo}`
    : "/default.png";

    useEffect(() => {
  const fetchData = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`http://localhost:11000/api/v1/application/mentor/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const apps = res.data.data;
      setApplications(apps);
      setAssigned(apps.filter(app => app.status === "accepted"));
      setPending(apps.filter(app => app.status === "pending"));
    } catch (err) {
      console.log('Error fetching the data:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [token,user]);

    if (loading) return <p >Loading...</p>;

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
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.jobsDiv}>
        <div>
          <h2>Assigned Jobs</h2>
          {assigned.length > 0 ? (
          <ul>
            {assigned.map(app => (
              <li key={app._id} >
                <p><strong>Job:</strong> {app.jobId?.title}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No assigned jobs yet.</p>
        )}
        </div>
        <div>
          <div>
            <h2>Pending jobs</h2>
            <p>Jobs offered from your startup</p>
            {pending.length > 0 ? (
          <ul>
            {pending.map(app => (
              <li key={app._id} >
                <p><strong></strong> {app.jobId?.title}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending applications.</p>
        )}
          </div>
          <div>
            <h2>Applications sent</h2>
            <p>Jobs you have applied for</p>
            {applications.length > 0 ? (
          <ul>
            {applications.map(app => (
              <li key={app._id} >
                <p><strong></strong> {app.jobId?.title}</p>
                <p><strong>Status:</strong> {app.status}</p>
                <p><strong>Type:</strong> {app.applicationType}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications sent yet.</p>
        )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MentorDashboard;
