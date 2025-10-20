import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="p-4 border-b">My Portfolio</nav>
        <div className="max-w-4xl mx-auto p-4">{children}</div>
        <footer className="p-4 border-t text-center">© {new Date().getFullYear()}</footer>
      </body>
    </html>
  );
}

