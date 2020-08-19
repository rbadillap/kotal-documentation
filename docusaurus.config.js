module.exports = {
  title: 'Kotal',
  tagline: 'Decentralized Blockchain Operator',
  url: 'https://kotal.co',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kotal',
  projectName: 'Kotal',
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'Kotal',
      logo: {
        alt: 'Kotal',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        {
          label: '❤️ Support',
          to: 'https://gitcoin.co/grants/1070/kotal-multi-client-cloud-agnostic-blockchain-infra',
          position: 'left',
        },
        {
          href: 'https://twitter.com/kotalco',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://discord.gg/kTxy4SA',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://github.com/kotalco/kotal',
          label: 'GitHub',
          position: 'right',
        },
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
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'kotal',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
