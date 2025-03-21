// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HWPXLib',
  tagline: '한글과컴퓨터의 HWPX 파일을 다루는 Java 라이브러리',
  favicon: 'img/favicon.ico',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/hwpxlib/',

  organizationName: 'your-org',
  projectName: 'hwpxlib',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/your-org/hwpxlib/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/hwpxlib-social-card.jpg',
      navbar: {
        title: 'HWPXLib',
        logo: {
          alt: 'HWPXLib Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '문서',
            docId: 'getting-started/introduction',
          },
          {
            href: 'https://github.com/your-org/hwpxlib',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://github.com/your-org/hwpxlib/issues',
            label: '이슈',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '문서',
            items: [
              {
                label: '시작하기',
                to: '/getting-started/introduction',
              },
              {
                label: '기본 사용법',
                to: '/basic-usage/reading',
              },
              {
                label: '고급 기능',
                to: '/advanced-features/document-structure',
              },
            ],
          },
          {
            title: '커뮤니티',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/your-org/hwpxlib',
              },
              {
                label: '이슈',
                href: 'https://github.com/your-org/hwpxlib/issues',
              },
            ],
          },
          {
            title: '더 알아보기',
            items: [
              {
                label: '예제',
                to: '/examples/basic-examples',
              },
              {
                label: '문제 해결',
                to: '/troubleshooting/common-issues',
              },
              {
                label: 'API 문서',
                to: '/references/api',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HWPXLib. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['java'],
      },
    }),
};

module.exports = config;
