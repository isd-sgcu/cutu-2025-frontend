import type { Metadata } from 'next';
import { Anuphan } from 'next/font/google';
import './globals.css';
import LineProvider from '../contexts/liff';

const anuphan = Anuphan({
  variable: '--font-anuphan',
  subsets: ['latin', 'thai'],
});

export const metadata: Metadata = {
  title: 'CUTU 2025',
  description: 'CUTU 2025',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${anuphan.variable} vsc-initialized bg-light-gray antialiased`}
      >
        <main className="relative mx-auto min-h-screen max-w-lg">
          <LineProvider>{children}</LineProvider>
          <div className="absolute inset-0 -z-50 bg-white"></div>
        </main>
      </body>
    </html>
  );
}
