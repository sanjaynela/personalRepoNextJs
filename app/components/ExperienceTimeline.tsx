'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  Buildings,
  CaretDown,
  MapPin,
} from '@phosphor-icons/react';
import type { Experience } from '../data/resume';

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? '');

  const activeExperience =
    experiences.find((experience) => experience.id === activeId) ?? experiences[0];

  if (!activeExperience) return null;

  return (
    <div className="experience-layout">
      <div className="experience-rail" role="tablist" aria-label="Career timeline">
        {experiences.map((experience) => {
          const isActive = experience.id === activeExperience.id;

          return (
            <button
              key={experience.id}
              className="experience-rail-item"
              data-active={isActive}
              onClick={() => setActiveId(experience.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls="active-experience"
            >
              <span className="experience-rail-dot" aria-hidden="true" />
              <span>
                <strong>{experience.company}</strong>
                <small>{experience.dates}</small>
              </span>
            </button>
          );
        })}

        <a className="education-rail-item" href="#education">
          <span className="experience-rail-dot" aria-hidden="true" />
          <span>
            <strong>Education</strong>
            <small>USC · SMU</small>
          </span>
        </a>
      </div>

      <div className="experience-content">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Experience</p>
            <h2>Professional journey</h2>
          </div>
          <a href="#github" className="text-link">
            View projects <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <article id="active-experience" className="experience-feature" role="tabpanel">
          <div className="experience-feature-header">
            {activeExperience.logoSrc ? (
              <div className="company-logo company-logo-active">
                <Image
                  src={activeExperience.logoSrc}
                  alt={activeExperience.logoAlt ?? activeExperience.company}
                  width={119}
                  height={35}
                />
              </div>
            ) : (
              <div className="company-icon" aria-hidden="true">
                <Buildings size={25} weight="duotone" />
              </div>
            )}
            <div>
              <div className="role-title-row">
                <h3>{activeExperience.company}</h3>
                {activeExperience.id === experiences[0]?.id ? (
                  <span className="status-chip">Current</span>
                ) : null}
              </div>
              <p>{activeExperience.role}</p>
              <div className="experience-meta">
                <span>{activeExperience.dates}</span>
                <span>
                  <MapPin size={14} weight="fill" aria-hidden="true" />
                  {activeExperience.location}
                </span>
              </div>
            </div>
          </div>

          <p className="experience-summary">{activeExperience.summary}</p>

          <ul className="experience-highlights">
            {activeExperience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="technology-list" aria-label="Technologies used">
            {activeExperience.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </article>

        <div className="experience-switcher" aria-label="Other positions">
          {experiences
            .filter((experience) => experience.id !== activeExperience.id)
            .slice(0, 2)
            .map((experience) => (
              <button key={experience.id} onClick={() => setActiveId(experience.id)}>
                {experience.logoSrc ? (
                  <span className="company-logo company-logo-small">
                    <Image
                      src={experience.logoSrc}
                      alt={experience.logoAlt ?? experience.company}
                      width={92}
                      height={27}
                    />
                  </span>
                ) : (
                  <span className="company-icon company-icon-small" aria-hidden="true">
                    <Buildings size={19} weight="duotone" />
                  </span>
                )}
                <span className="switcher-copy">
                  <strong>{experience.company}</strong>
                  <small>{experience.role}</small>
                </span>
                <span className="switcher-date">{experience.dates}</span>
                <CaretDown size={18} weight="bold" aria-hidden="true" />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
