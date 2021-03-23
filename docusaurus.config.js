module.exports = {
  title: 'Kotal',
  tagline: 'Simplifying Blockchain DevOps',
  url: 'https://kotal.co',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kotal',
  projectName: 'Kotal',
  themeConfig: {
    colorMode: {
      disableSwitch: true
    },
    image: 'img/cloud_native.png',
    navbar: {
      title: 'Kotal Documentation',
      logo: {
        alt: 'Kotal',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: "Back to Homepage",
          position: "right",
          href: "https://kotal.co",
        }
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} Kotal.`,
    },
  },
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,700&display=swap",
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/kotalco/kotal-documentation/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
