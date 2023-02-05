import React from 'react'
import styles from '../../styles/Post.module.css'
import {useQuerySubscription } from "react-datocms";
import { request } from "../../lib/datocms";
import Post from '../../components/Post';
import BlogCards from '../../components/BlogCards';
import Footer from '../../components/Footer';

export default function BlogPost(props) {

    // FULL BLOGPOST DATA
    const { data } = useQuerySubscription(props.subscription);
    const postData = data.artikkeli;
    const profileData = data.profile;

    // BLOG CARD DATA
    const { cardData } = props;
    const posts = cardData.allArtikkelis;

    return (
      <div>
        <div className={styles.container}>

          {/* POST CONTENT */}
          <Post data={postData} subData={profileData}/>

          {/* BLOG-CARDS */}
          <BlogCards data={posts} />

        </div>
        <Footer />
      </div>

  )
}

// GENERATE NEW PAGE
const PATH_QUERY = `
query MyQuery {
    allArtikkelis {
        slug
    }
}`

export async function getStaticPaths(context) {
    const slugQuery = await request({
      query: PATH_QUERY,
      preview: context.preview,
    });

    let paths = [];
    slugQuery.allArtikkelis.map((p) => paths.push(`/posts/${p.slug}`));

    return {
      paths,
      fallback: 'blocking',
    };
};

// CREATE BLOGPOST
const FULL_POST_QUERY = `query MyQuery($slug: String) {
  artikkeli(filter: {slug: {eq: $slug}}) {
    kontentti {
      value
    }
    author
    otsikko
    slug
    julkaisupIv
    taustakuva {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
  }
  profile {
    profilePic {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
  }
}
`

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

export async function getStaticProps({ params, preview, context }) {
    const graphqlRequest = {
      query: FULL_POST_QUERY,
      variables: { slug: params.slug },
      preview,
    };

    const cardData = await request({
      query: HOMEPAGE_QUERY,
    });

    return {
      props: {
        cardData,
        subscription: preview
          ? {
              ...graphqlRequest,
              initialData: await request(graphqlRequest),
              token: b76958e3d827c0216c584dd34234c9,
            }
          : {
              enabled: false,
              initialData: await request(graphqlRequest),
            },
            
      },
      revalidate: 120,
    };
};