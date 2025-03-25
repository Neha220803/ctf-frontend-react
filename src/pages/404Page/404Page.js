import React from "react";
import styles from "./404Page.module.css";
import { useNavigate } from "react-router-dom";

const Page404Comp = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error 404</h1>
      <p className={styles.subtitle}>
        Be Carefull! You might get eliminated from the game
      </p>
      <svg className={styles.shape} viewBox="0 0 100 100">
        <rect
          x="25"
          y="25"
          width="50"
          height="50"
          stroke="#ff0058"
          strokeWidth="2"
          fill="none"
        />
        <polygon
          points="50,20 80,70 20,70"
          stroke="#ff0058"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ff0058"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <button className={styles.button} onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default Page404Comp;
