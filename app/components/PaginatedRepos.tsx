'use client';

import { useState, useMemo, useEffect } from 'react';
import RepoCard from './RepoCard';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  created_at?: string;
};

type PaginatedReposProps = {
  repos: Repo[];
};

type YearTab = {
  year: string;
  label: string;
  count: number;
};

export default function PaginatedRepos({ repos }: PaginatedReposProps) {
  const entriesPerPage = 8;

  // Dynamically determine years and group repos
  const { availableTabs, reposByYear } = useMemo(() => {
    const reposByYearMap: Record<number, Repo[]> = {};
    const years: number[] = [];

    // Group repos by year
    repos.forEach((repo) => {
      if (repo.created_at) {
        const year = new Date(repo.created_at).getFullYear();
        if (!reposByYearMap[year]) {
          reposByYearMap[year] = [];
          years.push(year);
        }
        reposByYearMap[year].push(repo);
      }
    });

    // Sort years descending
    years.sort((a, b) => b - a);

    // Build tabs: latest year, next year (if exists), and older
    const tabs: YearTab[] = [];
    const reposByYear: Record<string, Repo[]> = {};

    if (years.length > 0) {
      const latestYear = years[0];
      const latestYearRepos = reposByYearMap[latestYear];
      tabs.push({
        year: latestYear.toString(),
        label: latestYear.toString(),
        count: latestYearRepos.length,
      });
      reposByYear[latestYear.toString()] = latestYearRepos;

      // Check for next year (latestYear - 1)
      if (years.length > 1 && years[1] === latestYear - 1) {
        const nextYear = years[1];
        const nextYearRepos = reposByYearMap[nextYear];
        tabs.push({
          year: nextYear.toString(),
          label: nextYear.toString(),
          count: nextYearRepos.length,
        });
        reposByYear[nextYear.toString()] = nextYearRepos;
      }

      // Collect all older repos (everything before the second tab or latest year)
      const olderRepos: Repo[] = [];
      const cutoffYear = tabs.length === 2 ? parseInt(tabs[1].year) : latestYear;
      years.forEach((year) => {
        if (year < cutoffYear) {
          olderRepos.push(...reposByYearMap[year]);
        }
      });

      if (olderRepos.length > 0) {
        tabs.push({
          year: 'older',
          label: 'Older',
          count: olderRepos.length,
        });
        reposByYear['older'] = olderRepos;
      }
    }

    return { availableTabs: tabs, reposByYear };
  }, [repos]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Set default selected year to the latest year when tabs are available
  useEffect(() => {
    if (availableTabs.length > 0 && (!selectedYear || !reposByYear[selectedYear])) {
      setSelectedYear(availableTabs[0].year);
      setCurrentPage(1);
    }
  }, [availableTabs, reposByYear, selectedYear]);

  const selectedRepos = reposByYear[selectedYear] || [];
  const totalPages = Math.ceil(selectedRepos.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayRepos = selectedRepos.slice(startIndex, endIndex);

  // Reset to page 1 when year changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {/* Year tabs - show below GitHub Projects title */}
      {availableTabs.length > 0 && (
        <div className="mt-2 mb-4 flex items-center gap-2 flex-wrap border-b border-gray-200">
          {availableTabs.map((tab) => (
            <button
              key={tab.year}
              onClick={() => handleYearChange(tab.year)}
              disabled={tab.count === 0}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                tab.count === 0
                  ? 'border-transparent text-gray-400 cursor-not-allowed'
                  : selectedYear === tab.year
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      )}

      {/* Repos grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayRepos.length > 0 ? (
          displayRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))
        ) : (
          <p className="text-gray-500 col-span-2">No projects found for this year.</p>
        )}
      </div>

      {/* Pagination controls - moved to bottom */}
      {selectedRepos.length > entriesPerPage && (
        <div className="mt-6 mb-4 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

