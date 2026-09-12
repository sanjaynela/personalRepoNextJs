import Image from 'next/image';
import {
  ArrowRight,
  AppleLogo,
  CheckCircle,
  Cloud,
  Code,
  Database,
  DeviceMobile,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr';
import ExperienceTimeline from './components/ExperienceTimeline';
import PaginatedRepos from './components/PaginatedRepos';
import { experiences } from './data/resume';

export const dynamic = 'force-dynamic';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  created_at?: string;
};

const capabilityGroups = [
  { name: 'Cloud', detail: 'AWS, Azure, GCP', icon: Cloud },
  { name: 'Mobile', detail: 'iOS, Android, Swift, Kotlin', icon: DeviceMobile },
  { name: 'Full-stack', detail: 'TypeScript, React, Node.js', icon: Code },
  { name: 'Systems & DevOps', detail: 'Scalable, reliable, observable', icon: Database },
];

async function getRepositories(): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME || 'sanjaynela';
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'sanjay-nelagadde-portfolio',
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) return [];

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];

    return [...(data as Repo[])].sort((a, b) => {
      const firstDate = new Date(a.created_at ?? 0).getTime();
      const secondDate = new Date(b.created_at ?? 0).getTime();
      return secondDate - firstDate;
    });
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

export default async function HomePage() {
  const repos = await getRepositories();

  return (
    <main>
      <section id="about" className="hero-section page-shell">
        <div className="hero-copy">
          <p className="hero-kicker">Software engineer&nbsp; / &nbsp;Problem solver&nbsp; / &nbsp;Systems builder</p>
          <h1>Sanjay Nelagadde</h1>
          <p className="hero-role">Senior Software Engineer</p>
          <p className="hero-statement">
            I build reliable systems across cloud, mobile, and connected devices.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#github">
              Explore GitHub Projects <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/sanjaynelagadde/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinLogo size={20} weight="fill" aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="capabilities-panel" aria-label="Core capabilities">
          <div className="capabilities-list">
            {capabilityGroups.map(({ name, detail, icon: Icon }) => (
              <div className="capability" key={name}>
                <Icon size={30} weight="duotone" aria-hidden="true" />
                <div>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="hero-note" aria-hidden="true">
            Ideas to
            <br />
            real-world impact.
          </p>
        </div>
      </section>

      <section id="experience" className="experience-section page-shell section-anchor">
        <ExperienceTimeline experiences={experiences} />
      </section>

      <section id="projects" className="scanumi-section page-shell section-anchor">
        <p className="eyebrow">Featured project</p>
        <div className="scanumi-layout">
          <Image
            src="/scanumi-app-icon.jpg"
            width={512}
            height={512}
            sizes="(max-width: 720px) 132px, 184px"
            alt="Scanumi app icon, a friendly folded paper character inside a scanner frame"
            className="scanumi-icon"
          />

          <div className="scanumi-copy">
            <span className="project-tag">Built independently</span>
            <h2>Scanumi: Document Scanner</h2>
            <p>
              A private, friendly scanner for notes, receipts, forms, and everyday paperwork.
              Capture clean PDFs, turn pages into editable Digital Notes, and keep everything on
              your device.
            </p>
            <div className="scanumi-actions">
              <a
                className="button button-primary"
                href="https://apps.apple.com/us/app/scanumi-document-scanner/id6802967091"
                target="_blank"
                rel="noreferrer"
              >
                <AppleLogo size={21} weight="fill" aria-hidden="true" />
                View on the App Store
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#github">
                Explore the code
              </a>
            </div>
          </div>

          <ul className="scanumi-features">
            <li>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              On-device scanning with VisionKit
            </li>
            <li>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              Vision OCR for accurate text recognition
            </li>
            <li>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              Private by design, with no document cloud
            </li>
            <li>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              Organize, search, and export Digital Notes
            </li>
            <li>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              Built natively with Swift
            </li>
          </ul>
        </div>
      </section>

      <section className="profile-section page-shell section-anchor" aria-labelledby="profile-heading">
        <div className="profile-heading">
          <p className="eyebrow">About</p>
          <h2 id="profile-heading">Architecture through delivery</h2>
        </div>
        <div className="profile-body">
          <p className="profile-lead">
            Senior Software Engineer with 7+ years of experience architecting backend systems,
            cloud infrastructure, and full-stack products across healthcare, IoT, and fintech.
          </p>
          <div className="profile-columns">
            <p>
              At Phase Margin, I lead a team of six engineers while remaining hands-on across
              TypeScript, NestJS, AWS, React/Next.js, iOS, Android, and BLE systems. I enjoy
              modernizing complex systems and turning architecture into reliable production
              delivery.
            </p>
            <p>
              My work spans highly available healthcare platforms, event-driven sensor pipelines,
              and native applications for connected medical devices. The common thread is careful
              systems thinking, clear technical contracts, and teams that can ship with confidence.
            </p>
          </div>
        </div>
      </section>

      <section id="education" className="education-section page-shell section-anchor">
        <p className="eyebrow">Education</p>
        <div className="education-grid">
          <div>
            <strong>University of Southern California</strong>
            <span>M.S. in Computer Science</span>
          </div>
          <div>
            <strong>Singapore Management University</strong>
            <span>B.S. in Information Systems</span>
          </div>
        </div>
      </section>

      <section id="github" className="github-section section-anchor">
        <div className="page-shell">
          <div className="section-heading-row github-heading">
            <div>
              <p className="eyebrow">Code archive</p>
              <h2>GitHub projects</h2>
              <p>A searchable record of experiments, utilities, and shipped ideas.</p>
            </div>
            <a
              className="button button-secondary"
              href="https://github.com/sanjaynela"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogo size={20} weight="fill" aria-hidden="true" /> GitHub profile
            </a>
          </div>
          <PaginatedRepos repos={repos} />
        </div>
      </section>
    </main>
  );
}
