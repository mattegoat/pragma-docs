const math = require("remark-math");
const katex = require("rehype-katex");

module.exports = {
  title: "Pragma",
  tagline: "Documentation and Guides",
  url: "https://pragma-docs.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.ico",
  organizationName: "Astraly-Labs", // Usually your GitHub org/user name.
  projectName: "pragma-docs", // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    image: "img/background.jpg",
    metadata: [{ name: "twitter:card", content: "summary" }],
    prism: {
      additionalLanguages: ["solidity", "rust", "python"],
    },
    algolia: {
      apiKey: "eca75468ae0780924db0b070f4f354a2",
      indexName: "pragma-docs",
      appId: "MN6QHW795Z",
    },
    navbar: {
      logo: {
        alt: "Pragma Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/introduction",
          label: "Protocol",
          position: "left",
          className: "persistent",
        },
        {
          label: "Give Feedback",
          to: "https://kprem87muy4.typeform.com/to/ahJVbIeI",
          position: "left",
          className: "persistent",
        },
        {
          href: "https://github.com/Astraly-Labs",
          label: "GitHub",
          position: "left",
          className: "persistent",
        },
      ],
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
  },
  presets: [
    [
      "docusaurus-preset-openapi",
      /** @type {import('docusaurus-preset-openapi').Options} */
      {
        api: {
          path: "versioned_docs/version-V3/Resources/PragmApi/openapi.json",
          routeBasePath: "/Resources/PragmApi/get-started",
        },
        proxy: {
          "/proxy": {
            target: "https://api.dev.pragma.build",
            pathRewrite: { "^/proxy": "" },
          },
        },
        docs: {
          path: "docs",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl: 'https://github.com/Astraly-Labs/astraly-docs/tree/main/',
          includeCurrentVersion: false,
          versions: {
            V3: {
              banner: "none",
            },
          },
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          path: "blog/",
          blogTitle: "Engineering Blog",
          blogSidebarCount: 0,
        },
        googleAnalytics: {
          trackingID: "GTM-P83BPCH7",
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
          // customCss2: require.resolve("./src/css/colors.css"),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};
