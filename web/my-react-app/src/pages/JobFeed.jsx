import { useState, useEffect } from "react";
import styles from "../pages/JobFeed.module.css";
import { jwtDecode } from "jwt-decode";
import search from "../assets/search.png";

function Jobfeed(){
    const [offers,setOffers] = useState([]);
    const [user, setUser] = useState(null);

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

    const fetchOffers = async () => {
        try{
        const res = await fetch('http://localhost:11000/api/v1/mentor/offers',
            {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });

        const data = await res.json();
        setOffers(data.data.offers);
    } catch(err){
        console.log(err);
    }
};
fetchOffers();
},[user,token]);

    const photo = user?.photo
    ? `http://localhost:11000/uploads/${user.photo}`
    : "/default.png";

    // const photoCompany = offers.companyId.photo ? `http://localhost:11000/uploads/${offers.companyId.photo}`
    // : "/default.png";

    return(
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
              <h2>All startup Jobs</h2>
              <div className={styles.jobFeed}>
                {offers.map((offer)=> {
                    const companyPhoto = offer.companyId?.photo
            ? `http://localhost:11000/uploads/${offer.companyId.photo}`
            : "/default.png";
            return(
                <div key={offer._id} className={styles.jobCard} >
                        <div className={styles.companyInfo}>
                            <img src={companyPhoto} alt="companyphoto" className={styles.companyPhoto}/>
                            <span>{offer.companyId.name}</span>
                        </div>
                        <h3>{offer.jobId?.title}</h3>
                        <p className={styles.newOffer}>New Job Offer</p>
                        <p>{offer.jobId?.description}</p>
                        <button>View More</button>

                    </div>

            )
                })}
                    
                    
                

              </div>
        </>
    )
}
export default Jobfeed