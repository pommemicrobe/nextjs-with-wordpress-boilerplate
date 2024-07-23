type GetSettingsProps = {
  slug: string;
  searchParams: {
    [name: string]: string;
  };
};

const getSettings = async ({ slug, searchParams }: GetSettingsProps) => {
  const response = await fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/wp/v2/settings`);
  const settings = await response.json();

  console.log('settings', settings);
  
  return settings;
};

export { getSettings };
