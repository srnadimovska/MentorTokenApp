import styles from "./Stats.module.css";
import search from "../assets/search.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function Stats() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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
        setUser(res.data.data.populateUser);
      } catch (err) {
        console.log(err.message);
        setError("Korisnikot ne e pornajden");
      }
    };

   
fetchUser();
    
    
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
          <div className={styles.userDiv}>
          <div>
            <img src={photo} alt="User" className={styles.userPhoto} />

            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userRole}>{user.type}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <h2>About</h2>
            <p>{user.skills}</p>
            <p>{user.desc}</p>
          </div>
          </div>
          
        )}
      </div>
      
    </>
  );
}
export default Stats;
