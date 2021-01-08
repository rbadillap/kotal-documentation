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
      title: 'Kotal',
      logo: {
        alt: 'Kotal',
        src: 'img/logo.svg',
      },
      items: [
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
          label: 'Join Our Discord',
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
          sidebarPath: require.resolve('./sidebars.js'),
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
