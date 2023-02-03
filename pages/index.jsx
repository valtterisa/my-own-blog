import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { request } from "../lib/datocms";

import BlogCard from '../components/BlogCard';

const HOMEPAGE_QUERY = `query MyQuery {
  allArtikkelis {
    kontentti {
      value
    }
    julkaisupIv
    otsikko
    slug
    taustakuva {
      url
    }
  }
}`;

export async function getStaticProps(context) {
  const data = await request({
    query: HOMEPAGE_QUERY,
    preview: context.preview,
  });
  return {
    props: { data },
  };
}

export default function Home(props) {

  const { data } = props; // access data
  const posts = data.allArtikkelis;
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* HEROSECTION */}
        <div className={styles.hero}>
          <h1>My Blog</h1>
          <div className={styles.circle}>
          </div>
          <p>Write a short description about yourself here. Or anything else you want.</p>
        </div>
        
        {/* BLOG-CARDS */}
        <div>
          <div className={styles.hrline}/>
          <h1>Blog</h1>

          {/* Etusivun uusimmat blogi-postaukset */}
          <div className={styles.cards}>
            {posts.slice(0,3).map((p) => (
              <BlogCard key={p.id} data={p} />
            ))}
          </div>
          </div>
      </main>

      <style jsx>{`
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
     

    </div>
  )
}