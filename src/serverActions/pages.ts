type GetPageProps = {
  slug: string;
  searchParams: {
    [name: string]: string;
  };
};

const getPage = async ({ slug, searchParams }: GetPageProps) => {
  return fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`)
    .then((response) => response.json())
    .then((data) => data[0]);
};

export { getPage };
