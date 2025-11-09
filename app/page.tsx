import PaginatedRepos from './components/PaginatedRepos';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  created_at?: string;
};

const BIO = `Sanjay Nelagadde is a Senior Software Engineer with a Master's in CS from USC. He has 7 years of experience in full-stack, mobile, and cloud development (AWS, Azure, GCP).`;

export default async function HomePage() {
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'https';
  
  // Construct absolute URL - Vercel provides these headers
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (host) {
      baseUrl = `${proto}://${host}`;
    } else {
      // Fallback for local development
      baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
    }
  }
  
  // Ensure baseUrl doesn't end with slash
  baseUrl = baseUrl.replace(/\/$/, '');
  
  const res = await fetch(`${baseUrl}/api/github`, { cache: 'no-store' });
  const repos: Repo[] = await res.json();

  return (
    <main className="p-2 sm:p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Me</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{BIO}</p>

      <h2 className="text-2xl font-semibold mt-8 text-gray-900 dark:text-gray-100">GitHub Projects</h2>
      <PaginatedRepos repos={repos} />
    </main>
  );
}

