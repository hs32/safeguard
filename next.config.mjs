/** @type {import('next').NextConfig} */
import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  search: { codeblocks: false },
  // ... Add Nextra-specific options here
});
 
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};
export default withNextra(nextConfig)
