/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;

{
  /**adding the experimental makes the pages to be cached. we have to do this manually,
   * as it was supported upto to nextjs13, but onwards it was disabled, so we have to add it manually */
}
