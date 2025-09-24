import styles from "./MentorDashboard.module.css";
import search from "../assets/search.png";
import clock from "../assets/clock.svg";
import  {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function MentorDashboard() {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("All");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error,setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded user in MentorDashboard:", decoded);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.userType,
        id: decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token");
      setError('Invalid token');
      setLoading(false);
    }
  }, [token]);

  

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:11000/api/v1/application/mentor/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const apps = res.data.data || [];
        setApplications(apps);

      } catch (err) {
        console.log("Error fetching the data:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const handleDecision = async (id, decision) => {
    try {
      const res = 
      await axios.patch(
        `http://localhost:11000/api/v1/application/${id}`,
        { acceptedStatus: decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data.data;

      setApplications((prev) => 
      prev.map((app) => (app._id === id? updated: app)))
 
    } catch (err) {
      console.error("Error updating app:", err.response || err.message);
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:11000/api/v1/application/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    
    setApplications((prev) => prev.filter((app) => app._id !== id));
  } catch (err) {
    console.error("Error deleting app:", err.response || err.message);
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!token) return <p>Please log in to view your dashboard.</p>;

  const assignedJobs = applications.filter((app) =>
    ["in progress", "done", "rejected"].includes(app.acceptedStatus)
  );

  const pendingJobs = applications.filter((app) => app.applicationType === "companyToMentor" && app.status === "pending");

  
  const filteredAssigned =
    filter === "All"
      ? assignedJobs
      : assignedJobs.filter((app) => app.acceptedStatus === filter);

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
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.jobsDiv}>
        <div className={styles.section}>
          <h2>Assigned Jobs</h2>
          <div className={styles.tabs}>
            <button onClick={() => setFilter("All")}>All</button>
            <button onClick={() => setFilter("done")}>Done</button>
            <button onClick={() => setFilter("rejected")}>Rejected</button>
            <button onClick={() => setFilter("in progress")}>In Progress</button>
          </div>

          {filteredAssigned.length > 0 ? (
            <div className={styles.cards}>
              {filteredAssigned.map((app) => (
                <div key={app._id} className={styles.card}>
                  <p className={styles.jobTitle}>{app.jobId?.title}</p>
                  <span
                    className={`${styles.status} ${
                      styles[app.acceptedStatus.toLowerCase().replace(/\s+/g, "-")] ||
                      ""
                    }`}
                  >
                    {app.acceptedStatus.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No assigned jobs yet.</p>
          )}
        </div>

        <div className={styles.section}>
          <div>
            <h2>Pending jobs</h2>
            <p>Jobs offered from your startup</p>
            {pendingJobs.length > 0 ? (
              <div className={styles.cards}>
                {pendingJobs.map((app) => (
                  <div key={app._id} className={styles.card}>
                    <p className={styles.jobTitle}>{app.jobId?.title}</p>
                    <div className={styles.actions}>
                      <button
                      onClick={() => handleDecision(app._id, "in progress")}
                      className={styles.accept}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecision(app._id, "rejected")}
                      className={styles.reject}
                    >
                      Reject
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No pending applications.</p>
            )}
          </div>

          <div className={styles.section}>
            <h2>Applications sent</h2>
            <p>Jobs you have applied for</p>
            {applications.length > 0 ? (
              <div className={styles.cards}>
                {applications.map((app) => (
                  <div key={app._id} className={styles.card}>
                    <p className={styles.jobTitle}> {app.jobId?.title}
                      
                      <span>
                        <button onClick={() => handleDelete(app._id)} className={styles.deleteButton}>Delete</button></span>
                      <span><img src={clock} alt="clock"/></span>
                    </p>
                    
                  </div>
                ))}
              </div>
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
