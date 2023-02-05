import React from 'react'
import styles from '../styles/Hero.module.css';
import { Image } from 'react-datocms/image';

function HeroSection(props) {

    const { data } = props;

    return (
        <div className={styles.hero}>
              <h1>My Blog</h1>
                  <Image className={styles.profilepic} data={data.profilePic.responsiveImage}/>
              <p>{data.aboutMe}</p>
        </div>
    )
}

export default HeroSection