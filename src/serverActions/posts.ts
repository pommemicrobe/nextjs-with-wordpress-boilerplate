type GetPostsProps = {
  searchParams: {
    [name: string]: string;
  };
};

const getPosts = async ({ searchParams }: GetPostsProps) => {
  const response = await fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/posts?${new URLSearchParams(searchParams)}`);
  const posts = await response.json();

  console.log('posts', posts);
  
  return posts;
};

export { getPosts };
