// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HITOP',
  tagline: 'Hotel IT Operating Procedure',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hitop.gkraipur216.workers.dev',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',

        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },

   [
  '@docusaurus/plugin-content-docs',
  {
    id: 'sops',
    path: 'sops',
    routeBasePath: 'sops',
    sidebarPath: './sidebarsSops.js',
  },
],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'troubleshooting',
        path: 'troubleshooting',
        routeBasePath: 'troubleshooting',
      },
    ],

    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        searchBarPosition: 'left',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },

    navbar: {
      title: 'HITOP',

      logo: {
        alt: 'HITOP Logo',
        src: 'img/logo.svg',
      },

      items: [
  {
    to: '/',
    label: 'Home',
    position: 'left',
  },

  {
    to: '/sops/',
    label: 'SOP',
    position: 'left',
  },

  {
    to: '/docs/',
    label: 'Documentation',
    position: 'left',
  },

  {
    to: '/troubleshooting/',
    label: 'Troubleshooting',
    position: 'left',
  },

  {
    to: '/support',
    label: 'Support',
    position: 'right',
    className: 'navbar-support-btn',
  },
],
  },
    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} HITOP – Hotel IT Operating Procedure. All rights reserved.`,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};


export default config;         