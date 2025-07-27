import React from "react";
import styles from "./MentorCard.module.css";

function MentorCard({ name, skills, rating, image }) {
  return (
    <div className={styles.card}>
      <div>
      <img src={image} alt={name} className={styles.avatar} />
      </div>
      <div>
      <h3>{name}</h3>
      <p className={styles.skills}>{skills}</p>
      
      <div className={styles.rating}>
        <span>⭐ {rating}</span>
      </div>
      </div>
      <div>
        <button>View Mentor</button>
      </div>
    </div>
  );
}

export default MentorCard;