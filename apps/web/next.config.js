/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/auth"],
  experimental: {
    turbo: {
      resolveAlias: {
        "@/components/ui/*": "../../packages/ui/src/components/ui/*",
        "@/hooks/*": "../../packages/ui/src/hooks/*",
        "@/lib/*": "../../packages/ui/src/lib/*"
      }
    }
  }
};

export default nextConfig;
