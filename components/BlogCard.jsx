import React, { useEffect, useState } from 'react'
import styles from '../styles/Cards.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard(props) {
    const { data } = props;
    
    // DATE FORMAT
    const timestamp = new Date(data.julkaisupIv).getTime();
    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).toLocaleDateString('default', {month: 'long'});
    const year = new Date(timestamp).getFullYear();
    
    const [FormattedDate, setFormattedDate] = useState();

    useEffect(() => setFormattedDate(`${month} ${day}, ${year}`), []);
    
    return (
        <Link href={`/posts/${data.slug}`}>
            <div className={styles.card}>
                <Image src={data.taustakuva.url} width={250} height={150} className={styles.cardtausta}/>
                <p className={styles.cardtext}>{data.otsikko}</p>
                <p className={styles.carddate}>{FormattedDate}</p>
            </div>
        </Link>
    )
}
