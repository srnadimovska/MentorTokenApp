import styles from "./Contact.module.css";
function Contact() {
    return(
        <>
        <div className={styles.contactWrapper}>
            <div className={styles.firstSection}>
            <h1>Let's Talk!</h1>
            <p>We're thrilled to connect with you!Whether you have a question,need assistance, or want to discuss a potenrial project,we're<br/>
            here to listen and help. At Mentor Token, we believe in the power of collaboration and are committed to providing you with the best<br />
            support and solutions. Fill out the form below and ona of our team members will get back to you as soon as possible.<br/>
            Let's create something amazing together!
            </p>
            </div>
            <form className={styles.form}>
                <div className={styles.inputFields}>
                    <input type="text" placeholder="Full name"/>
                    <input type="text" placeholder="Email address"/>
                </div>
                <input type="textarea" placeholder="Your message" className={styles.textArea}/>
            </form>
             <div className={styles.buttonDiv}>
                <button className={styles.button}>SEND MESSAGE</button>
                </div>
            

        </div>
        </>
    )
}
export default Contact