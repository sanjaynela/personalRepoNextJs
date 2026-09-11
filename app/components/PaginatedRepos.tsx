'use client';

import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import RepoCard from './RepoCard';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  created_at?: string;
};

type YearTab = {
  year: string;
  label: string;
  count: number;
};

const ENTRIES_PER_PAGE = 8;

export default function PaginatedRepos({ repos }: { repos: Repo[] }) {
  const { availableTabs, reposByYear } = useMemo(() => {
    const grouped = new Map<number, Repo[]>();

    for (const repo of repos) {
      if (!repo.created_at) continue;
      const year = new Date(repo.created_at).getUTCFullYear();
      grouped.set(year, [...(grouped.get(year) ?? []), repo]);
    }

    const years = [...grouped.keys()].sort((a, b) => b - a);
    const tabs: YearTab[] = [];
    const tabRepos: Record<string, Repo[]> = {};

    if (years.length > 0) {
      const latest = years[0];
      const latestRepos = grouped.get(latest) ?? [];
      tabs.push({ year: String(latest), label: String(latest), count: latestRepos.length });
      tabRepos[String(latest)] = latestRepos;

      if (years[1] === latest - 1) {
        const previous = years[1];
        const previousRepos = grouped.get(previous) ?? [];
        tabs.push({ year: String(previous), label: String(previous), count: previousRepos.length });
        tabRepos[String(previous)] = previousRepos;
      }

      const cutoff = tabs.length === 2 ? Number(tabs[1].year) : latest;
      const older = years.filter((year) => year < cutoff).flatMap((year) => grouped.get(year) ?? []);
      if (older.length > 0) {
        tabs.push({ year: 'older', label: 'Earlier', count: older.length });
        tabRepos.older = older;
      }
    }

    return { availableTabs: tabs, reposByYear: tabRepos };
  }, [repos]);

  const [selectedYear, setSelectedYear] = useState(availableTabs[0]?.year ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!selectedYear && availableTabs[0]) setSelectedYear(availableTabs[0].year);
  }, [availableTabs, selectedYear]);

  const availableLanguages = useMemo(
    () =>
      [...new Set(repos.flatMap((repo) => (repo.language ? [repo.language] : [])))].sort(),
    [repos],
  );

  const filteredRepos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return (reposByYear[selectedYear] ?? []).filter((repo) => {
      const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
      const matchesQuery =
        !query ||
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.language?.toLowerCase().includes(query);
      return matchesLanguage && Boolean(matchesQuery);
    });
  }, [reposByYear, searchQuery, selectedLanguage, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / ENTRIES_PER_PAGE));
  const displayRepos = filteredRepos.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE,
  );

  function resetPage() {
    setCurrentPage(1);
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedLanguage(null);
    resetPage();
  }

  if (availableTabs.length === 0) {
    return <p className="repo-empty">GitHub projects are temporarily unavailable.</p>;
  }

  return (
    <div className="repo-browser">
      <div className="repo-tabs" role="tablist" aria-label="Repository years">
        {availableTabs.map((tab) => (
          <button
            key={tab.year}
            role="tab"
            aria-selected={selectedYear === tab.year}
            onClick={() => {
              setSelectedYear(tab.year);
              resetPage();
            }}
          >
            {tab.label} <span>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="repo-search">
        <MagnifyingGlass size={21} weight="bold" aria-hidden="true" />
        <label htmlFor="repo-search" className="sr-only">
          Search repositories
        </label>
        <input
          id="repo-search"
          type="search"
          placeholder="Search by project, description, or language"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            resetPage();
          }}
        />
        {searchQuery || selectedLanguage ? (
          <button onClick={clearFilters} aria-label="Clear repository filters">
            <X size={20} weight="bold" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="language-filters" aria-label="Filter repositories by language">
        <span>Language</span>
        <button
          data-active={selectedLanguage === null}
          onClick={() => {
            setSelectedLanguage(null);
            resetPage();
          }}
        >
          All
        </button>
        {availableLanguages.map((language) => (
          <button
            key={language}
            data-active={selectedLanguage === language}
            onClick={() => {
              setSelectedLanguage((current) => (current === language ? null : language));
              resetPage();
            }}
          >
            {language}
          </button>
        ))}
      </div>

      {searchQuery || selectedLanguage ? (
        <p className="repo-results-count">
          {filteredRepos.length} {filteredRepos.length === 1 ? 'project' : 'projects'} found
        </p>
      ) : null}

      <div className="repo-grid">
        {displayRepos.length > 0 ? (
          displayRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p className="repo-empty">No projects match these filters.</p>
        )}
      </div>

      {totalPages > 1 ? (
        <div className="repo-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
