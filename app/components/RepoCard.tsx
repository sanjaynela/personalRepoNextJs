type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  created_at?: string;
};

export default function RepoCard({ repo }: { repo: Repo }) {
  const createdLabel = repo.created_at
    ? new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(repo.created_at))
    : undefined;
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md hover:bg-gray-50 transition">
      <a href={repo.html_url} target="_blank" className="text-blue-600 font-medium" rel="noreferrer">
        {repo.name}
      </a>
      <p className="text-sm text-gray-600">{repo.description}</p>
      <p className="text-xs text-gray-400 mt-1">Language: {repo.language ?? 'Unknown'}</p>
      {createdLabel && (
        <p className="text-xs text-gray-500 mt-1 italic">Created: {createdLabel}</p>
      )}
    </div>
  );
}

