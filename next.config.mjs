const isProd = process.env.NODE_ENV === "production";
const repo = "notaria-saas";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages sirve el sitio en /<repo>/
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
