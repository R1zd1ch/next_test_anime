import { Metadata } from 'next';
import './globals.css';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Anime-test-app',
  description: 'by Evgeniy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
        />
      </Head>
      <body className="bg-neutral-900 text-white">
        <Header />
        <div className="h-full min-h-screen">
          <main className="mx-0 md:mx-16">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
