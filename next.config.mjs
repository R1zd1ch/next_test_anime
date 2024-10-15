/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Протокол (например, https)
        hostname: 'anilibria.tv', // Хостнейм внешнего сайта (например, example.com)
        port: '', // Порт, если он используется (обычно пустой для https)
        pathname: '/storage/releases/posters/**', // Разрешает доступ к указанному пути
      },
    ],
    // localPatterns: [
    //   {
    //     pathname: '/assets/images/**',
    //     search: '',
    //   },
    // ],
  },
};

export default nextConfig;
