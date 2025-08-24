import styles from "./Login.module.css";
import rocket from "../assets/rocket.png";
import logo from "../assets/Group 8626.svg";
import logo1 from "../assets/Group 5083.svg";
import background from "../assets/pozadina.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:11000/api/v1/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        const userType = res.data.user?.userType || res.data.user?.type;

        if (userType === "mentor") {
          navigate("/dashboardMentor");
        } else if (userType === "startup") {
          navigate("/dashboardStartup");
        }
      } else {
        setError(res.data.error || "Greska pri najavuvanje");
      }
    } catch (err) {
      console.log(err);
      setError("Serverska greska");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftContainer}>
        <h1>GROW YOUR STARTUP!</h1>
        <h3>MONITORING AND EVALUATING NOW IS EASY</h3>
        <div className={styles.images}>
          <img src={rocket} alt="rocket" className={styles.rocketLogo} />
          <div className={styles.bottomLogo}>
            <img src={logo} alt="logo" />
            <p>mentortoken.com</p>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <img src={logo1} alt="logo1" />
        <h1>LOG IN TO MENTOR TOKEN</h1>
        <h3>Enter your email and password to login</h3>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
            <p>Forgot your password?</p>
            {error && (
              <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
            )}
            <button type="submit">Login in</button>
          </form>
        </div>

        <p>Don't have account?</p>
        <span>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}
export default Login;
