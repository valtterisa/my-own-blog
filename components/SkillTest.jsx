import React from 'react'
import styles from '../styles/SkillTest.module.css'

function SkillTest() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1 style={{ textAlign: "center" }}>This is to test your <br/><span className={styles.span}>css</span> skills.</h1>
            <p style={{ maxWidth: "600px", textAlign: "center" }}>No real function for this, but this will give us a good indication for your level of
                expertise with css. Feel free to show off in case this feels too easy.
            </p>
        </div>
        <div className={styles.maincontent}>
            <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <input className={styles.input} type="text" placeholder="Label" required/>
                  <label className={styles.label} >Label</label>
                </div>

                <div className={styles.inputField}>
                  <input className={styles.input} type="text" placeholder="Input text" />
                  <label className={styles.label}>Input text</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkillTest