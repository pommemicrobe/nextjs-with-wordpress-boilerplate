type GetPostsProps = {
  searchParams: {
    [name: string]: string;
  };
};

const getPosts = async ({ searchParams }: GetPostsProps) => {
  return fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/posts?${new URLSearchParams(searchParams)}`)
    .then((response) => response.json());
};

export { getPosts };
