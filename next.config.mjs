// basePath solo para GitHub Pages (sitio en /<repo>/).
// En Vercel u otros hosts en la raíz, GITHUB_PAGES no está seteado → sin basePath.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repo = "notaria-saas";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGitHubPages ? `/${repo}` : "",
  assetPrefix: isGitHubPages ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
