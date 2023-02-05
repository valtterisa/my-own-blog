import { useRouter } from 'next/router';
import React from 'react'
import styles from '../styles/Cards.module.css'
import BlogCard from './BlogCard';

function BlogCards(props) {
    const { data } = props;
    
    // Decide heading
    const router = useRouter();
    const heading = router.pathname === "/" ? "Blog" : "Other posts";

    return (
        <div>
            <div className={styles.hrline}/>
            <h2>{heading}</h2>
            {/* Etusivun uusimmat blogi-postaukset */}
            <div className={styles.cards}>
                {data.map((p) => (
                    <BlogCard key={p.id} data={p} />
                ))}
            </div>
        </div>
  )
}

export default BlogCards