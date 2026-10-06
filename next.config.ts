import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMPORARY (Andra, 2026-10-06): the waitlist page moved from "/" to
  // "/waitlist" and the new home page is not built yet, so "/" sends visitors
  // there instead of 404ing. A config redirect keeps the query string (UTM
  // tags on old links). Delete this entry in the same change that adds the new
  // `src/app/page.tsx`.
  async redirects() {
    return [{ source: "/", destination: "/waitlist", permanent: false }];
  },
};

export default nextConfig;
