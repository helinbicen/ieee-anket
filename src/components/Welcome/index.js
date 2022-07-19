import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SurveyInner from "../SurveyInner";
import styles from "./index.module.css";

import { useAuth } from "../../context/UserContext";

import WdataLogo from "../../assets/wdata_black.png";

function Welcome() {
  const { user, signWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length !== 0) {
      navigate("/survey");
    }
  }, [user, navigate]);


  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <SurveyInner
          image={<img src={WdataLogo} alt="WNEXT" className="wdata-logo" />}
          title="Katılım için hızlıca giriş yap."
          nextButtonShow={false}
          prevButtonShow={false}
        />
        <button className={styles.buttonSign} onClick={signWithGoogle}>
          <div>
            <h3>Google ile giriş yap</h3>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Welcome;
