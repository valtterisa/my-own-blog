import Head from 'next/head'
import { request } from "../lib/datocms";
import styles from '../styles/Home.module.css';
import BlogCards from '../components/BlogCards';
import HeroSection from '../components/HeroSection';
import SkillTest from '../components/SkillTest';
import Footer from '../components/Footer';

export default function Home(props) {

  const { blogPostData } = props; // access data
  const { profileData } = props;

  const posts = blogPostData.allArtikkelis;

  const profile = profileData.profile;

  return (
    <div className={styles.container}>
      <Head>
        <title>Etusivu</title>
        <link rel="icon" href="/favicon.ico" />
        
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no"/>
        <meta name="description" content="Valtteri's own blog where he shares his mind"/>
        <meta name="author" content="Valtteri Savonen" />

        <meta property="og:site_name" content="Valtteri's blog"/>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Valtteri's blog"/>
        <meta property="og:description" content="Valtteri's own blog where he shares his mind"/>
        <meta property="og:image" content="https://www.datocms-assets.com/93135/1675540441-hacker.jpg?fm=webp"/>
        <meta property="og:url" content="https://my-own-blog-omega.vercel.app/"/>
      </Head>

      <main className={styles.main} >

        {/* HEROSECTION */}
        <HeroSection data={profile} />
        
        {/* BLOG-CARDS */}
        <BlogCards data={posts} />

        <SkillTest />

        <Footer />
      </main>

    </div>
  )
}

const HOMEPAGE_QUERY = `query MyQuery {
  allArtikkelis(first: 3, orderBy: _createdAt_DESC) {
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

const PROFILE_INFO_QUERY = `query MyQuery {
  profile {
    aboutMe
    profilePic {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        sizes
        height
        src
        srcSet
        title
        width
        webpSrcSet
      }
    }
  }
}`

export async function getStaticProps(context) {
  const blogPostData = await request({
    query: HOMEPAGE_QUERY,
    preview: context.preview,
  });

  const profileData = await request({
    query: PROFILE_INFO_QUERY,
    preview: context.preview,
  });

  return {
    props: { blogPostData, 
        profileData },
  };
}