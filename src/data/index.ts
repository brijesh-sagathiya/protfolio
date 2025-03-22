import { SkillCategory, Project, ExperienceItem, BlogPost, FAQ } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    logos: [
      { name: 'JavaScript', icon: '/logos/javascript.svg', color: '#F7DF1E' },
      { name: 'TypeScript', icon: '/logos/typescript.svg', color: '#3178C6' },
      { name: 'Node.js', icon: '/logos/nodejs.svg', color: '#339933' },
      { name: 'NestJS', icon: '/logos/nestjs.svg', color: '#E0234E' },
      { name: 'Express.js', icon: '/logos/expressjs.svg', color: '#000000' },
      { name: 'Fastify', icon: '/logos/fastify.svg', color: '#FFFFFF' },
      { name: 'Angular', icon: '/logos/angular.svg', color: '#DD0031' },
      { name: 'Next.js', icon: '/logos/nextjs.svg', color: '#FFFFFF' },
      { name: 'React', icon: '/logos/react.svg', color: '#61DAFB' },
      { name: 'Vue.js', icon: '/logos/vue.svg', color: '#4FC08D' },
      { name: 'Mongoose', icon: '/logos/mongoose.svg', color: '#880000' },
      { name: 'Prisma', icon: '/logos/prisma.svg', color: '#2D3748' },
      { name: 'MongoDB', icon: '/logos/mongodb.svg', color: '#47A248' },
      { name: 'PostgreSQL', icon: '/logos/postgresql.svg', color: '#4169E1' },
      { name: 'SQL', icon: '/logos/sql.svg', color: '#E48E00' },
      { name: 'Docker', icon: '/logos/docker.svg', color: '#2496ED' },
      { name: 'GraphQL', icon: '/logos/graphql.svg', color: '#E10098' },
      { name: 'Jest', icon: '/logos/jest.svg', color: '#C21325' },
      { name: 'Mocha', icon: '/logos/mocha.svg', color: '#8D6748' },
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'OCRU CRM System',
    description:
      'Led full-stack development of a comprehensive CRM system, handling both frontend and backend implementation. Managed international client communications and feature implementations.',
    technologies: ['React', 'Material UI', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    role: 'Full-Stack Developer',
    achievements: [
      'Reduced API response time by 40% through query optimization',
      'Implemented real-time updates using WebSocket',
      'Designed scalable database architecture',
    ],
    link: null,
  },
  {
    title: 'Career Portal',
    description:
      'Architected and developed an advanced admin panel backend system from ground up, focusing on performance and scalability.',
    technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    role: 'Backend Developer',
    achievements: [
      'Built robust REST APIs with comprehensive documentation',
      'Implemented role-based access control',
      'Integrated automated email notifications',
    ],
    link: 'https://career.conversantech.com/',
  },
  {
    title: 'Mailing System',
    description:
      'Developed a sophisticated API-based mailing system for efficient communication, featuring templates and tracking capabilities.',
    technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    role: 'Backend Developer',
    achievements: [
      'Designed template-based email system',
      'Implemented email tracking and analytics',
      'Created rate limiting and queue management',
    ],
    link: null,
  },
  {
    title: 'Money Maven',
    description:
      'Created a comprehensive personal finance management application backend with advanced reporting and tracking features.',
    technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    role: 'Backend Developer',
    achievements: [
      'Developed automated PDF report generation',
      'Implemented secure transaction handling',
      'Created data visualization APIs',
    ],
    link: null,
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    role: 'Junior MERN Stack Backend Developer',
    company: 'Conversant Technologies',
    period: '2022 - Present',
    description:
      'Spearheading backend development initiatives and contributing to full-stack projects. Developed multiple successful applications focusing on scalability, performance, and user experience.',
    websiteUrl: 'https://conversanttechnologies.com',
    technologies: [
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'React',
      'Material UI',
      'TypeScript',
      'REST APIs',
    ],
    projects: [
      {
        title: 'OCRU CRM System',
        description:
          'Led full-stack development of a comprehensive CRM system, handling both frontend and backend implementation. Managed international client communications and feature implementations.',
        technologies: ['React', 'Material UI', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
        role: 'Full-Stack Developer',
        achievements: [
          'Reduced API response time by 40% through query optimization',
          'Implemented real-time updates using WebSocket',
          'Designed scalable database architecture',
        ],
        link: 'https://www.oracle.com/in/cx/what-is-crm/',
      },
      {
        title: 'Career Portal',
        description:
          'Architected and developed an advanced admin panel backend system from ground up, focusing on performance and scalability.',
        technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
        role: 'Backend Developer',
        achievements: [
          'Built robust REST APIs with comprehensive documentation',
          'Implemented role-based access control',
          'Integrated automated email notifications',
        ],
        link: 'https://career.conversantech.com/',
      },
      {
        title: 'Mailing System',
        description:
          'Developed a sophisticated API-based mailing system for efficient communication, featuring templates and tracking capabilities.',
        technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
        role: 'Backend Developer',
        achievements: [
          'Designed template-based email system',
          'Implemented email tracking and analytics',
          'Created rate limiting and queue management',
        ],
        link: null,
      },
      {
        title: 'Money Maven',
        description:
          'Created a comprehensive personal finance management application backend with advanced reporting and tracking features.',
        technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
        role: 'Backend Developer',
        achievements: [
          'Developed automated PDF report generation',
          'Implemented secure transaction handling',
          'Created data visualization APIs',
        ],
        link: null,
      },
    ],
    delay: 0,
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'Optimizing Node.js for High-Performance Applications',
    date: 'March 15, 2024',
    image: '/blog/optimizing-nodejs.png',
    delay: 0,
    content: {
      description:
        'Discover techniques to enhance the speed and scalability of Node.js applications, ensuring efficient backend performance in production.',
      points: [
        'Utilizing <strong>efficient database queries</strong> with MongoDB and PostgreSQL',
        'Implementing <strong>caching strategies</strong> for faster response times',
        'Optimizing <strong>API performance</strong> using rate limiting and pagination',
        'Enhancing <strong>scalability</strong> with load balancing and microservices',
        'Reducing <strong>memory leaks</strong> and improving garbage collection',
      ],
      references: [
        {
          title: 'Node.js Performance Best Practices',
          url: 'https://nodejs.org/en/docs/guides/performance/',
        },
        {
          title: 'MongoDB Indexing Strategies',
          url: 'https://www.mongodb.com/docs/manual/indexes/',
        },
        {
          title: 'Optimizing Express.js Apps',
          url: 'https://expressjs.com/en/advanced/best-practice-performance.html',
        },
      ],
    },
  },
  {
    title: 'Scaling MERN Applications: Best Practices and Strategies',
    date: 'March 10, 2024',
    image: '/blog/mern-applications.png',
    delay: 1,
    content: {
      description:
        'Learn how to build and scale MERN applications efficiently, leveraging modern architectural patterns and optimization techniques.',
      points: [
        'Designing <strong>modular backend services</strong> using NestJS and Express',
        'Optimizing <strong>React performance</strong> with memoization and lazy loading',
        'Enhancing <strong>state management</strong> with Redux Toolkit or Zustand',
        'Using <strong>Docker and Kubernetes</strong> for deployment and scalability',
        'Securing APIs with <strong>JWT authentication and role-based access control</strong>',
      ],
      references: [
        {
          title: 'NestJS Documentation',
          url: 'https://docs.nestjs.com/',
        },
        {
          title: 'Scaling React Applications',
          url: 'https://reactjs.org/docs/optimizing-performance.html',
        },
        {
          title: 'Dockerizing a MERN Stack App',
          url: 'https://docs.docker.com/get-started/',
        },
      ],
    },
  },
  {
    title: 'Mastering TypeScript for Backend Development',
    date: 'March 5, 2024',
    image: '/blog/mastering-typescript.png',
    delay: 2,
    content: {
      description:
        'Explore advanced TypeScript features that enhance backend development, ensuring robust and type-safe applications.',
      points: [
        'Leveraging <strong>generics</strong> for reusable type-safe code',
        'Using <strong>decorators</strong> for NestJS and Express middleware',
        'Applying <strong>advanced type inference</strong> to reduce boilerplate',
        'Implementing <strong>strict type safety</strong> in database interactions with Prisma',
        'Optimizing <strong>error handling</strong> using custom exception filters',
      ],
      references: [
        {
          title: 'TypeScript Advanced Types',
          url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html',
        },
        {
          title: 'NestJS with TypeScript',
          url: 'https://docs.nestjs.com/techniques/validation',
        },
        {
          title: 'TypeScript Best Practices',
          url: 'https://basarat.gitbook.io/typescript/',
        },
      ],
    },
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How do you ensure scalability in your backend applications?',
    answer:
      'I design applications using modular architectures, microservices, and efficient database queries. Techniques like caching, load balancing, and indexing help maintain performance at scale.',
    delay: 0,
  },
  {
    question: 'What strategies do you use for optimizing API performance?',
    answer:
      'I focus on reducing response times by implementing caching (Redis), optimizing database queries, using pagination, and ensuring efficient request handling with middleware.',
    delay: 1,
  },
  {
    question: 'How do you handle authentication and security in your applications?',
    answer:
      'I implement authentication using JWT, OAuth, or session-based strategies. Security best practices include input validation, rate limiting, CORS policies, and using HTTPS.',
    delay: 2,
  },
  {
    question: 'What is your experience with DevOps and deployment?',
    answer:
      'I have experience with containerization using Docker, CI/CD pipelines, and deploying applications on cloud platforms like AWS, Vercel, and DigitalOcean.',
    delay: 3,
  },
];
