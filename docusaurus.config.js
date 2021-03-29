/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Senlima Sun blog",
  tagline: "A blog include web development note",
  url: "https://senlima.blog",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "senlima4",
  projectName: "blog",
  themes: ["@docusaurus/theme-live-codeblock"],
  themeConfig: {
    navbar: {
      title: "Senlima Sun",
      logo: {
        alt: "My Site Logo",
        src: "img/logo192.png",
      },
      items: [
        {
          href: "https://senlima.info",
          label: "About Author",
          position: "left",
        },
        {
          href: "https://twitter.com/senlima4",
          label: "Twitter",
          position: "right",
        },
        {
          href: "https://github.com/senlima4",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Senlima Sun. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: false,
        blog: {
          path: "./blog",
          routeBasePath: "/",
          blogTitle: "Senlima Sun dev blog",
          blogDescription: "Blog include web development",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Senlima Sun`,
          },
        },
      },
    ],
  ],
};
