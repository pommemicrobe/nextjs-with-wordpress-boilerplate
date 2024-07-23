import { getThemeSettings } from '@/serverActions/themeSettings';

export default async function Header() {
  const themeSettings = await getThemeSettings();
  const menu = themeSettings.menus[0];

  return (
    <header>
      <menu>
        {menu && menu.links.map((link: any, index: number) => (
          <a
            key={index}
            href={link.value}
          >
            {link.label}
          </a>
        ))}
      </menu>
    </header>
  );
};
