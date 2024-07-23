type GetPageProps = {
  slug: string;
  searchParams: {
    [name: string]: string;
  };
};

const getPage = async ({ slug, searchParams }: GetPageProps) => {
  const response = await fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`);
  const page = await response.json();

  console.log('page', page);
  
  return page[0];
};

export { getPage };
