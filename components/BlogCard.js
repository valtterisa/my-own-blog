import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

function BlogCard(props) {
    const { data } = props;
    
    // DATE FORMAT
    const timestamp = new Date(data.julkaisupIv).getTime();
    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).toLocaleDateString(
        'default', 
        {month: 'long'
    });
    const year = new Date(timestamp).getFullYear();
    
    const [FormattedDate, setFormattedDate] = useState();

    useEffect(() => setFormattedDate(`${month} ${day}, ${year}`), []);

    return (
        <Link href={`/posts/${data.slug}`}>
            <div className={styles.card}>
                <Image src={data.taustakuva.url} width={250} height={200} className={styles.cardtausta}></Image>
                <p className={styles.cardtext}>{data.otsikko}</p>
                <p className={styles.carddate}>{FormattedDate}</p>
            </div>
        </Link>
    )
}

export default BlogCard
