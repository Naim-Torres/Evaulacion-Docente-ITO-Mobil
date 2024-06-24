import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = {};

export default withPWA({});
/** @type {import('next').NextConfig} */

