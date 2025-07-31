import styles from "./Register.module.css";
import rocket from "../assets/rocket.png";
import logo from "../assets/Group 8626.svg";
import logo1 from "../assets/Group 5083.svg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");

  const [passwordCheck, setPasswordCheck] = useState({
    isLong: false,
    includesSymbol: false,
    includesNameEmail: false,
  });

  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    if (!userType) {
      setError("Please select an account type.");
      return;
    }

    if (!email || !password) {
      setError("Please enter email or password!");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let user = {
      email,
      password,
      type: userType,
      name,
    };

    if (userType === "mentor") {
      // user.name = name;
      user.phone = phone;
      user.skills = skills;
    } else {
      // user.name = name;
      user.representative = representative;
      user.address = address;
    }
    if (inviteEmails) {
      user.inviteEmails = inviteEmails.split(",").map((e) => e.trim());
    }

    try {
      const res = await axios.post(
        "http://localhost:10000/api/v1/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201 || res.data.message === "New user created") {
        navigate("/dashboard");
      } else {
        setError(res.data.error || "Error creating new user!");
      }
    } catch (err) {
      console.log(err);
      setError("Server error!");
    }
  };

  const checkPassword = (pass) => {
    const userName = name.toLowerCase().trim();
    const userEmail = email.toLowerCase().trim();
    const userPass = pass.toLowerCase().trim();

    setPasswordCheck({
      isLong: userPass.length >= 8,
      includesSymbol: /[\d!@#$%^&*(),.?":{}|<>]/.test(userPass),
      includesNameEmail:
        !userPass.includes(userName) && !userPass.includes(userEmail),
    });
  };

  return (
    <div className={styles.registerContainer}>
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
        <h1>CHOOSE ACCOUNT TYPE</h1>

        {step === 1 && (
          <div className={styles.buttonDiv}>
            <button
              type="button"
              className={`${styles.button}${
                userType === "startup" ? styles.active : ""
              }`}
              onClick={() => {
                setUserType("startup");
                setStep(1);
                setError("");
              }}
            >
              Startup
            </button>
            <button
              type="button"
              className={`${styles.button}${
                userType === "mentor" ? styles.active : ""
              }`}
              onClick={() => {
                setUserType("mentor");
                setStep(1);
                setError("");
              }}
            >
              Mentor
            </button>
          </div>
        )}

        <div className={styles.formContainer}>
          <form onSubmit={step === 1 ? handleContinue : handleSubmit}>
            {step === 1 && (
              <div>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPassword(e.target.value);
                  }}
                  required
                  placeholder="password"
                />

                <p
                  className={
                    passwordCheck.isLong ? styles.valid : styles.invalid
                  }
                >
                  At least 8 characters
                </p>
                <p
                  className={
                    passwordCheck.includesSymbol ? styles.valid : styles.invalid
                  }
                >
                  Contains a number or symbol
                </p>
                <p
                  className={
                    passwordCheck.includesNameEmail
                      ? styles.valid
                      : styles.invalid
                  }
                >
                  Cannot contain your name or email address
                </p>
                <p>
                  Password Strength:{" "}
                  {passwordCheck.isLong &&
                  passwordCheck.includesSymbol &&
                  passwordCheck.includesNameEmail
                    ? "Strong"
                    : "Weak"}
                </p>
              </div>
            )}

            {step === 2 && (
              <>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {userType === "mentor" && (
                  <>
                    <label>Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <label>Skills</label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      required
                    />
                  </>
                )}
                {userType === "startup" && (
                  <>
                    <label>Legal Representative</label>
                    <input
                      type="text"
                      value={representative}
                      onChange={(e) => setRepresentative(e.target.value)}
                      required
                    />
                    <label>Business Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <label>
                      Invite Mentors (optional, comma-separated emails)
                    </label>
                    <input
                      type="text"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                    />
                  </>
                )}
              </>
            )}

            {error && (
              <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
            )}
            <button type="submit">{step === 1 ? "Continue" : "Submit"}</button>
          </form>
        </div>

        <p>Already have an account?</p>
        <span>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}
export default Register;
