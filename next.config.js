/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.wyzard.ai", "images.wyzai.co"],
    unoptimized: true,
  },
  output: "export",
  // webpack(config) {
  //   // Add the polyfill to the entry points
  //   const entry = config.entry;
  //   config.entry = async () => {
  //     const entries = await entry();

  //     // Add the polyfill to both client and server
  //     if (
  //       entries["main-app"] &&
  //       !entries["main-app"].includes("./utils/polyfills.js")
  //     ) {
  //       entries["main-app"].unshift("./utils/polyfills.js");
  //     }

  //     return entries;
  //   };

  //   return config;
  // },
  transpilePackages: ["next"],

  env: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.ENVIRONMENT || "TEST",
    API_URL: getEnvironmentUrl().baseUrl,
    OWLERY_URL: getEnvironmentUrl().owleryBaseUrl,
    SDK_URL: getEnvironmentUrl().sdkUrl,
    NEXT_PUBLIC_SDK_URL: getEnvironmentUrl().sdkUrl,
    NEXT_PUBLIC_SITE_URL: getEnvironmentUrl().siteUrl,
  },
};

function getEnvironmentUrl() {
  const environment = process.env.ENVIRONMENT || "TEST";

  switch (environment) {
    case "PROD":
      return {
        baseUrl: "https://bifrost.wyzard.ai/api/v1",
        owleryBaseUrl: "https://owlery.wyzard.ai/api/v1",
        sdkUrl: "https://images.wyzard.ai/pt-sdkImport.js",
        siteUrl: "https://copilot.wyzard.ai",
      };
    case "STAGING":
      return {
        baseUrl: "https://bifrost.wyzard.in/api/v1",
        owleryBaseUrl: "https://owlery.wyzard.in/api/v1",
        sdkUrl: "https://images.wyzard.ai/st-sdkImport.js",
        siteUrl: "https://copilot.wyzard.in",
      };
    case "TEST":
      return {
        baseUrl: "https://bifrostuat.zenlabs.in/api/v1",
        owleryBaseUrl: "https://owleryuat.zenlabs.in/api/v1",
        sdkUrl: "https://images.wyzard.ai/st-sdkImport.js",
        siteUrl: "https://copilotuat.zenlabs.in",
      };
    default:
      return {
        baseUrl: "https://bifrostuat.zenlabs.in/api/v1",
        owleryBaseUrl: "https://owleryuat.zenlabs.in/api/v1",
        sdkUrl: "https://images.wyzard.ai/st-sdkImport.js",
        siteUrl: "https://copilotuat.zenlabs.in",
      };
  }
}

module.exports = nextConfig;
