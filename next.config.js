const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const nextConfiguration = {
  target: "serverless", //will output independent pages that don't require a monolithic server. It's only compatible with next start or Serverless deployment platforms (like ZEIT Now) — you cannot use the custom server API.
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: [
      "taiq-images.s3.ap-south-1.amazonaws.com",
      "https://sim4yarfg6.execute-api.ap-south-1.amazonaws.com",
      "https://fxlzwo42la.execute-api.ap-south-1.amazonaws.com",
      "lnsig7iddg.execute-api.ap-south-1.amazonaws.com",
      "mish-fit-user-post-images.s3.amazonaws.com",
      "play.google.com",
      "mish-fit-user-post-images.s3.ap-south-1.amazonaws.com",
      "https://sim4yarfg6.execute-api.ap-south-1.amazonaws.com",
    ],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  i18n: {
    locales: ["en", "hi"],
    defaultLocale: "en",
  },
  rewrites: async () => {
    return [
      {
        source: "/signup",
        destination: "/signup.html",
      },
    ];
  },
};

module.exports = withPlugins([optimizedImages], nextConfiguration);
