const getThemeSettings = async () => {
  return fetch(`${process.env.WORDPRESS_BASE_URL}/wp-json/theme/settings`)
    .then((response) => response.json());
};

export { getThemeSettings };
