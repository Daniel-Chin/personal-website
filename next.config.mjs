/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource", // Handles PDFs as static files
      generator: {
        filename: "static/media/[name].[hash][ext]", // Outputs PDFs to the public directory
      },
    });

    return config;
  },
};

export default nextConfig;
