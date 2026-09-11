import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react/dist/ssr';

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
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      }).format(new Date(repo.created_at))
    : undefined;

  return (
    <article className="repo-card">
      <div className="repo-card-heading">
        <GithubLogo size={22} weight="duotone" aria-hidden="true" />
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>
      <p>{repo.description || 'An open-source project from my GitHub archive.'}</p>
      <div className="repo-card-meta">
        <span>{repo.language || 'Project'}</span>
        {createdLabel ? <time>{createdLabel}</time> : null}
      </div>
    </article>
  );
}
