import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Caveat, Manrope } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-note',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sanjay Nelagadde | Senior Software Engineer',
  description:
    'Senior Software Engineer building reliable backend, cloud, web, mobile, and connected-device systems.',
};

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', (saved || preferred) === 'dark');
  } catch (_) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.variable} ${caveat.variable}`}>
        <ThemeProvider>
          <header className="site-header">
            <a className="brand-mark" href="#about" aria-label="Sanjay Nelagadde, back to top">
              SN
            </a>
            <nav className="site-nav" aria-label="Primary navigation">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#github">GitHub</a>
            </nav>
            <div className="header-actions">
              <ThemeToggle />
              <span>Let&apos;s build something great.</span>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <a className="brand-mark brand-mark-small" href="#about" aria-label="Back to top">
              SN
            </a>
            <p>Built with care in Los Angeles.</p>
            <p>© {new Date().getFullYear()} Sanjay Nelagadde</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
