import React, { useEffect, useState } from 'react'
import { Image, StructuredText } from "react-datocms";
import styles from '../styles/Post.module.css'
import Link from "next/link";

function Post(props) {

    // FULL BLOGPOST DATA
    const { data } = props;

    // DATE FORMAT
    const timestamp = new Date(data.julkaisupIv).getTime();
    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).toLocaleDateString('default', {month: 'long'});
    const year = new Date(timestamp).getFullYear();
    
    const [FormattedDate, setFormattedDate] = useState();

    useEffect(() => setFormattedDate(`${month} ${day}, ${year}`), []);

    return (
        <div className={styles.content}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                {data.author}
              </p>
              <p>
                {FormattedDate}
              </p>
            </div>
            <Image data={data.taustakuva.responsiveImage}/>
            <div style={{ marginTop: "10px", textDecoration: "underline" }}>
              <Link href="/">
              ← Back to home
              </Link>
            </div>
            <h1>{data.otsikko}</h1>
            <StructuredText
              data={data.kontentti}
            />
        </div>
    )
}

export default Post