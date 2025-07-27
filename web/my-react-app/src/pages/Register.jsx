import styles from './Register.module.css'
import rocket from "../assets/rocket.png";
import logo from "../assets/Group 8626.svg";
import logo1 from "../assets/Group 5083.svg";
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
function Register() {
    const[email, setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const res = await axios.post('http://localhost:9000/api/v1/register',{email,password},{headers: {'Content-Type' : 'application/json'}});
            if(res.status === 201 || res.data.message === 'New user created'){
                navigate('/setup')
            }else {
                setError(res.data.error || 'Error creating new user!')
            }
        } catch(err){
            console.log(err);
            setError('Server error!')
        }
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
        <div className={styles.buttonDiv}>
        <button>Startup</button>
        <button>Mentor</button>
        </div>
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
            {error && (
              <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
            )}
            <button type="submit">Continue</button>
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
