import styles from "./About.module.css";
import arrow from "../assets/arrow-right.png"
import ceo from "../assets/CEO.png";
function About() {
    return (
        <div>
            <div className={styles.firstSection}>
            <h1>
                Meet our team members
            </h1>
            <p>We Focus on the details of everything we do. All to help businesses around the world<br/>
                Focus on what's most important to them.
            </p>
            <button><img src={arrow} alt="arrow" /><span>Get in touch</span></button>
            </div>
            <div className={styles.secondSection}>
                <img src={ceo} alt="ceo"/>

            </div>
        </div>
    )
}
export default About