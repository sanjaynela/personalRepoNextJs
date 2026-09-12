export type Experience = {
  id: string;
  company: string;
  logoSrc?: string;
  logoAlt?: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    id: 'phase-margin',
    company: 'Phase Margin',
    logoSrc: '/phase-margin-logo.webp',
    logoAlt: 'Phase Margin',
    role: 'Senior Software Engineer',
    dates: 'May 2023 – Present',
    location: 'Los Angeles, California',
    summary:
      'Leading architecture and delivery across backend, cloud, web, mobile, and connected-device systems while managing a team of six engineers.',
    highlights: [
      'Migrated 259 REST endpoints into 33 NestJS modules with Prisma and OpenAPI; production incidents fell 40%.',
      'Built multi-AZ AWS infrastructure sustaining 99.9% uptime for an FDA-approved wearable platform.',
      'Delivered native BLE medical applications in Swift and Kotlin with HMAC mutual authentication.',
      'Designed event-driven AWS pipelines processing more than 50K sensor readings every day.',
      'Cut build-to-deploy time by 60% with GitHub Actions and enabled daily releases.',
    ],
    technologies: ['TypeScript', 'NestJS', 'Prisma', 'AWS', 'React', 'Swift', 'Kotlin', 'BLE'],
  },
  {
    id: 'sonavi-labs',
    company: 'Sonavi Labs',
    logoSrc: '/sonavi-labs-logo.png',
    logoAlt: 'Sonavi Labs',
    role: 'Senior Software Engineer',
    dates: 'Jan 2022 – May 2023',
    location: 'Los Angeles, California',
    summary:
      'Built telehealth platforms and signal-processing systems for an FDA-approved digital stethoscope.',
    highlights: [
      'Delivered Node.js APIs and React frontends for patient intake, clinician review, and diagnostic workflows across three telehealth applications.',
      'Created five Python Lambda microservices that automated lung and heart sound analysis for clinician dashboards.',
      'Incrementally replaced Angular and Spring Boot services with React and Node.js, cutting API response times by 35% and frontend load times in half.',
      'Developed Xamarin applications for multi-modal BLE transfer of questionnaires, audio recordings, and diagnostic data.',
    ],
    technologies: ['Node.js', 'React', 'Python', 'AWS Lambda', 'Xamarin', 'BLE'],
  },
  {
    id: 'nokia',
    company: 'Nokia',
    role: 'Software Engineer Intern',
    dates: 'May 2021 – Aug 2021',
    location: 'Mountain View, California',
    summary:
      'Automated network-data collection and hardware inspection workflows for engineering teams.',
    highlights: [
      'Consolidated port addresses from scattered datasets into a dependable single-source CSV workflow.',
      'Used Docker, Paramiko, and Telnetlib to automate retrieval of chip information from network equipment.',
    ],
    technologies: ['Python', 'Docker', 'Paramiko', 'Telnet'],
  },
  {
    id: 'usc',
    company: 'CSSE@USC',
    role: 'Software Engineer Intern',
    dates: 'May 2020 – Dec 2020',
    location: 'Los Angeles, California',
    summary:
      'Built a responsive public portal that helped people discover research entities across USC.',
    highlights: [
      'Developed the portal with Node.js, Express, and Bootstrap.',
      'Integrated Instagram Basic Display and Instafeed.js to surface current research activity.',
    ],
    technologies: ['Node.js', 'Express', 'Bootstrap', 'Instagram API'],
  },
  {
    id: 'innovo42',
    company: 'Innovo42',
    role: 'Software Engineer',
    dates: 'May 2018 – Dec 2019',
    location: 'Singapore',
    summary:
      'Built an Azure-hosted expense management product spanning billing, accounting integrations, and REST services.',
    highlights: [
      'Implemented subscription billing with Braintree and automated monthly invoices through Xero OAuth APIs.',
      'Established a Java backend on Azure App Services with Azure Cosmos DB.',
      'Designed Jersey REST services across a C#, Java, and JavaScript stack.',
    ],
    technologies: ['C#', 'Java', 'JavaScript', 'Azure', 'Cosmos DB', 'Braintree'],
  },
];
