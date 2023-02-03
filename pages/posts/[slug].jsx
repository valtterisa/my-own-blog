import { Image, StructuredText, useQuerySubscription } from "react-datocms";
import styles from '../../styles/Post.module.css'
import { request } from "../../lib/datocms";

export default function BlogPost(props) {

    const { data } = useQuerySubscription(props.subscription);
    const postData = data.artikkeli;

    return (
        <div>
            <Image data={postData.taustakuva}/>
            <h1>{postData.otsikko}</h1>
            <StructuredText data={postData.kontentti.value} />
        </div>
  )
}

// -- LUODAAN UUSI SIVU --
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

// LUODAAN BLOGIPOSTAUS
const FULL_POST_QUERY = `
query MyQuery($slug: String) {
    artikkeli(filter: {slug: {eq: $slug}}) {
        kontentti {
          value
        }
        otsikko
        slug
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
}`

export async function getStaticProps({ params, preview }) {
    const graphqlRequest = {
      query: FULL_POST_QUERY,
      variables: { slug: params.slug },
      // If true, the Content Delivery API with draft content will be used
      preview,
    };
    return {
      props: {
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