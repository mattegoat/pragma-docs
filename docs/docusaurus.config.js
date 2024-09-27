module.exports = {
  title: "Pragma",
  tagline: "Documentation and Guides",
  url: "https://docs.pragma.build/",
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
        width: "auto",
        height: 40,
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
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          // editUrl: 'https://github.com/Astraly-Labs/astraly-docs/tree/main/',
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        blog: {
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
  plugins: [
    "my-loaders",
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          pragma: {
            specPath: "./openapi.json",
            outputDir: "docs/Resources/PragmAPI/Reference",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: false,
            baseUrl: "https://api.dev.pragma.build",
          },
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
};
