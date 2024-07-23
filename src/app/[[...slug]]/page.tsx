import { Metadata } from 'next';

import { getPage } from '@/serverActions/pages';
import { getPosts } from '@/serverActions/posts';

type PageProps = {
  params: {
    slug: string[];
  };
  searchParams: {
    [name: string]: string;
  };
};

const getPageData = async ({ slug, searchParams }: any) => {
  if (process.env.WORDPRESS_HOMEPAGE_SLUG) {
    const cleanSlug = !slug?.join('/') ? process.env.WORDPRESS_HOMEPAGE_SLUG : slug.join('/');
    return getPage({ slug: cleanSlug, searchParams });
  }

  return null;
}

export async function generateMetadata({ params: { slug }, searchParams }: PageProps): Promise<Metadata> {
  const pageData = await getPageData({ slug, searchParams });

  return {
    title: pageData?.title?.rendered,
    description: 'Home page description',
  }
}

export default async function Page({ params: { slug }, searchParams }: PageProps) {
  if (process.env.WORDPRESS_HOMEPAGE_SLUG) {
    const pageData = await getPageData({ slug, searchParams });

    return (
      <>
        {
          pageData?.acf?.blocks.map(async (block: any, index: number) => {
            try {
              const BlockComponent = (await import(`@/components/blocks/${block.type}`)).default;

              return (
                <BlockComponent key={index} data={block[block.type]} />
              );
            } catch (error) {
              console.error(`Block component ${block.type} not found`);
            }
          })
        }
      </>
    );
  }

  const postsData = await getPosts({ searchParams });

  return (
    <>
      {
        postsData?.map((post: any) => (
          <div key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
          </div>
        ))
      } 
    </>
  );
};
