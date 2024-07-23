type GetMenusProps = {
  slug: string;
  searchParams: {
    [name: string]: string;
  };
};

const getMenus = async ({ slug, searchParams }: GetMenusProps) => {
  const response = await fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/menus`);
  const menus = await response.json();

  console.log('menus', menus);
  
  return menus;
};

export { getMenus };
