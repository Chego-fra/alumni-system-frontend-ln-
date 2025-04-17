/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com", 
      "i.pinimg.com",
      "encrypted-tbn0.gstatic.com",
      "plus.unsplash.com",
      "images.unsplash.com",
      "randomuser.me",
      "tse1.mm.bing.net",  
      "tse2.mm.bing.net",
      "tse4.mm.bing.net",
      "tse3.mm.bing.net",
      "tse5.mm.bing.net",
      "tse6.mm.bing.net",
      "www.pexels.com",
      "youtu.be",
      "www.youtube.com",
      "localhost"
    ],
  },

  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: "http://localhost:8000/storage/:path*",
      },
    ];
  },
};



export default nextConfig;
