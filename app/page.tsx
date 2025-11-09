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
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? (host ? `${proto}://${host}` : 'http://localhost:3000');
  const res = await fetch(`${baseUrl}/api/github`, { cache: 'no-store' });
  const repos: Repo[] = await res.json();

  return (
    <main className="p-2 sm:p-4">
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-line">{BIO}</p>

      <h2 className="text-2xl font-semibold mt-8">GitHub Projects</h2>
      <PaginatedRepos repos={repos} />
    </main>
  );
}

