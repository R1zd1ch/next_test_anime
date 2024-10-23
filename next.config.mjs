import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anilibria.tv',
        port: '',
        pathname: '/storage/releases/posters/**',
      },
      {
        protocol: 'https',
        hostname: 'anilibria.top',
        port: '',
        pathname: '/storage/releases/posters/**',
      },
      {
        protocol: 'https',
        hostname: 'anilibria.top',
        port: '',
        pathname: '/storage/anime/genres/images/**',
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https', // Протокол (например, https)
    //     hostname: 'anilibria.tv', // Хостнейм внешнего сайта (например, example.com)
    //     port: '', // Порт, если он используется (обычно пустой для https)
    //     pathname: '/storage/releases/posters/**', // Разрешает доступ к указанному пути
    //   },
    // ],

    // remotePatterns: [
    //   {
    //     protocol: 'https', // Протокол (например, https)
    //     hostname: 'anilibria.top', // Хостнейм внешнего сайта (например, example.com)
    //     port: '', // Порт, если он используется (обычно пустой для https)
    //     pathname: '/storage/releases/posters/**', // Разрешает доступ к указанному пути
    //   },
    // ],
    // localPatterns: [
    //   {
    //     pathname: '/assets/images/**',
    //     search: '',
    //   },
    // ],
  },
};

export default withNextVideo(nextConfig);