import PaginatedRepos from './components/PaginatedRepos';

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
  // Call GitHub API directly instead of going through internal API route
  // This avoids URL construction issues in server components
  const username = process.env.GITHUB_USERNAME || 'your-github-username';
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`;
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'nextjs-portfolio',
      'Accept': 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }

  const data = await res.json();
  const repos: Repo[] = Array.isArray(data)
    ? [...data].sort((a, b) => {
        const da = new Date(a?.created_at ?? 0).getTime();
        const db = new Date(b?.created_at ?? 0).getTime();
        return db - da; // newest first
      })
    : [];

  return (
    <main className="p-2 sm:p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Me</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{BIO}</p>

      <h2 className="text-2xl font-semibold mt-8 text-gray-900 dark:text-gray-100">GitHub Projects</h2>
      <PaginatedRepos repos={repos} />
    </main>
  );
}

// Force redeploy
