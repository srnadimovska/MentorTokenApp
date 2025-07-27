import styles from "./Home.module.css";
import MentorCard from "./MentorCard";
import pc from "../assets/pc.png";
import logos1 from "../assets/Logos.png";
import logos2 from "../assets/Logos2.png";
import logos3 from "../assets/logos3.png";
import rocket from "../assets/rocket.png";
import rocketlogo from "../assets/rocketlogo.png";
import tracking from "../assets/tracing.png";
import reward from "../assets/reward.png";
import library from "../assets/library.png";
import woman from "../assets/woman.png";
import dashboard from "../assets/category.png";
import mentor from "../assets/profile.png";
import token from "../assets/disc.png";
import logo from "../assets/Group 8626.svg";
import icon from "../assets/icon.png";
import search from "../assets/search.png";
import avatar1 from "../assets/Avatar1.png";
import avatar2 from "../assets/Avatar2.png";
import avatar3 from "../assets/Avatar3.png";
import logoutButton from "../assets/Logout.png";

function Home() {
  return (
    <>
      <div className={styles.firstSection}>
        <div className={styles.hero}>
          <div className={styles.text}>
            <h1>Grow your StartUp! Monitoring and Evaluating now is easy!</h1>
            <h2>
              Welcome to Mentor Token, where we redefine the dynamics of
              start-up success. Our innovative platform offers a transformative
              approach to mentorship, ensuring that mentors are not just engaged
              but motivated to drive the success of the ventures they support.
            </h2>
            <button>Get Started</button>
            <span>Get in Touch</span>
          </div>
          <img src={pc} alt="pc" />
        </div>
      </div>

      <div className={styles.logos}>
        <div>
          <img src={logos1} alt="logos1" />
        </div>
        <div>
          <img src={logos2} alt="logos2" />
        </div>
        <div>
          <img src={logos3} alt="logos3" />
        </div>
      </div>
      <div className={styles.featuresContainer}>
        <img src={rocket} alt="rocket" className={styles.rocketimg} />
        <div className={styles.featuresHeader}>
          <p>Features</p>
          <h1>
            Boost Your Startup's Journey: Discover Mentor Token's Robust
            Features
          </h1>
        </div>
        <div className={styles.featuresCardContainer}>
          <div className={styles.featuresCard}>
            <img src={rocketlogo} alt="rocketlogo" />
            <h3>Goal Setting</h3>
            <p>Set clear and achievable goals for your startup's success.</p>
          </div>
          <div className={styles.featuresCard}>
            <img src={tracking} alt="tracking" />
            <h3>Performance Tracking </h3>
            <p>Monitor mentor performance in real-time and track progress.</p>
          </div>
          <div className={styles.featuresCard}>
            <img src={reward} alt="reward" />
            <h3>Reward system</h3>
            <p>
              Motivate mentors with a secure and rewarding token-based reward
              system.
            </p>
          </div>
          <div className={styles.featuresCard}>
            <img src={library} alt="library" />
            <h3>Knowledge Library</h3>
            <p>
              Access a comprehensive knowledge library to equip mentors with the
              skills, and motivation
            </p>
          </div>
        </div>
      </div>
      <div className={styles.successH1}>
        <h1>
          Every <span>success</span> is rewarded!
        </h1>
      </div>
      <div className={styles.fourSection}>
        <img src={woman} alt="woman" className={styles.womanImage}/>
      <div className={styles.MentorsContainer}>
        
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerMenu}>
            <div className={styles.leftContainerLogo}>
          <img src={logo} alt="logo" className={styles.logoImg}/><span><img src={icon}/></span>
          </div>
          <p><img src={dashboard} alt="dashboard"/><span>Dashboard</span></p>
          <p><img src={mentor} alt="mentor"/><span>Mentors</span></p>
          <p><img src={token} alt="token"/><span>Tokens</span></p>
          </div>
          <div>
            <button><img src={logoutButton} alt="logout"/></button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.searchArea}>
            <input type="text" placeholder="Search mentor..."/>
            <img src={search} alt="serach-icon"/>
            </div>
            <div className={styles.addNewMentor}>
              <h2>Mentors</h2>
              <p>Monitor and add new mentors</p>
              <div className={styles.buttonsMentors}>
                <button>Add new Mentor</button>
                <button>Create New Job</button>
              </div>
            </div>

            <div className={styles.content}>
          <div className={styles.mentors}>
            <MentorCard name="Kierra Press" skills="Sales | Management | Problem-solving" rating="2.4" image={avatar1} />
            <MentorCard name="Alison Vetrows" skills="Sales | Management | Problem-solving" rating="4.0" image={avatar2} />
            <MentorCard name="Marcus Carder" skills="Leadership | Management | Product sales" rating="3.9" image={avatar3} />
          </div>

          <div className={styles.stats}>
            <div className={styles.overview}>
              <h2>Quick Overview</h2>
              <h3>In the last month</h3>
            </div>
            <div className={styles.statBox}>
              <h4>Total Mentors</h4>
              <p>32</p>
            </div>
            <div className={styles.statBox}>
              <h4>Assigned Jobs</h4>
              <p>63</p>
            </div>
            <div className={styles.statBox}>
              <h4>Monthly Progress</h4>
              <p>19%</p>
            </div>
            <div className={styles.statBox}>
              <h4>Tokens Reserved</h4>
              <p>35,125.00</p>
            </div>
          </div>
        </div>



        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
