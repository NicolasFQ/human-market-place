import React from "react";
import styles from "../styles/Banner.module.css";

const Banner = () => {
  const leftImage = "/images/banner_left.png";
  const rightTopImage = "/images/banner_right1.png";
  const rightBottomImage = "/images/banner_right2.png";

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.leftItem}>
        <img
          src={leftImage}
          alt="Left Banner"
          className={styles.leftImage}
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightTopItem}>
          <img
            src={rightTopImage}
            alt="Right Top Banner"
            className={styles.rightImage}
          />
        </div>
        <div className={styles.rightBottomItem}>
          <img
            src={rightBottomImage}
            alt="Right Bottom Banner"
            className={styles.rightImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;