import './styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import logo from './app-logo.png';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      <body className="{inter.className} bg-slate-700 h-screen shadow-inner">
        <nav className="bg-slate-300">
          <Link href="/">
            <Image src={logo} width={"200"} height={"64"} alt='app-logo'></Image>
          </Link>
        </nav>
        <div id='main' className="">
          {children}
        </div>
      </body>
    </html>
  );
}
