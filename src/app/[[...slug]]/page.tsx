import { Metadata } from 'next';

import { getMenus } from '@/serverActions/menus';
import { getPage } from '@/serverActions/pages';
import { getPosts } from '@/serverActions/posts';
import { getSettings } from '@/serverActions/settings';

type PageProps = {
  params: {
    slug: string[];
  };
  searchParams: {
    [name: string]: string;
  };
};

// export const metadata: Metadata = {
//   title: 'Home page',
//   description: 'Home page description',
// };

export async function generateMetadata({ params: { slug }, searchParams }: PageProps): Promise<Metadata> {
  return {
    title: slug?.join('/'),
    description: 'Home page description',
  }
}

export default async function Page({ params: { slug }, searchParams }: PageProps) {
  if (process.env.WORDPRESS_HOMEPAGE_SLUG) {
    const cleanSlug = !slug?.join('/') ? process.env.WORDPRESS_HOMEPAGE_SLUG : slug.join('/');
    const pageData = await getPage({ slug: cleanSlug, searchParams });

    return (
      <>
        <h1 dangerouslySetInnerHTML={{ __html: pageData.title.rendered }}></h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}></div>
      </>
    );
  }

  const postsData = await getPosts({ searchParams });

  return (
    <>
      {
        postsData.map((post: any) => (
          <div key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
          </div>
        ))
      } 
    </>
  );
};
