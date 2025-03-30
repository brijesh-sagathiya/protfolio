import { SkillCategory, Project, ExperienceItem, BlogPost, FAQ, FooterLink } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    logos: [
      { name: 'JavaScript', icon: '/logos/javascript.svg', color: '#F7DF1E' },
      { name: 'TypeScript', icon: '/logos/typescript.svg', color: '#3178C6' },
      { name: 'Node.js', icon: '/logos/nodejs.svg', color: '#339933' },
      { name: 'NestJS', icon: '/logos/nestjs.svg', color: '#E0234E' },
      { name: 'Express.js', icon: '/logos/expressjs.svg', color: '#000000' },
      { name: 'Fastify', icon: '/logos/fastify.svg', color: '#000000' },
      { name: 'Angular', icon: '/logos/angular.svg', color: '#DD0031' },
      { name: 'Next.js', icon: '/logos/nextjs.svg', color: '#000000' },
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
    question: 'What is your development approach?',
    answer:
      'I follow a clean code approach with test-driven development (TDD) practices. I focus on writing maintainable, scalable, and well-documented code. I believe in the importance of code reviews and continuous integration/deployment (CI/CD) practices.',
    delay: 0,
  },
  {
    question: 'How do you handle project deadlines and priorities?',
    answer:
      'I use agile methodologies and project management tools to track progress and meet deadlines. I prioritize tasks based on business impact and technical dependencies, ensuring timely delivery while maintaining code quality.',
    delay: 1,
  },
  {
    question: 'What is your experience with modern web technologies?',
    answer:
      'I have extensive experience with modern web technologies including React, Node.js, TypeScript, and various databases. I stay updated with the latest trends and best practices in web development through continuous learning and experimentation.',
    delay: 2,
  },
  {
    question: 'How do you approach problem-solving in development?',
    answer:
      'I follow a systematic approach: first understanding the problem thoroughly, breaking it down into smaller components, researching potential solutions, implementing the most efficient solution, and finally testing and refining the implementation.',
    delay: 3,
  },
  {
    question: 'What is your preferred tech stack?',
    answer:
      'I specialize in the MERN (MongoDB, Express.js, React, Node.js) stack with TypeScript. I also have experience with PostgreSQL, NestJS, and various other modern web technologies. I choose the tech stack based on project requirements and scalability needs.',
    delay: 4,
  },
];

export const footerLinks: FooterLink[] = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#home' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experience', href: '#experience' },
      { name: 'Blog', href: '#blog' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { name: 'Portfolio Website', href: '#' },
      { name: 'E-Commerce Platform', href: '#' },
      { name: 'AI-Powered App', href: '#' },
      { name: 'Business Dashboard', href: '#' },
    ],
  },
  {
    title: 'Social Media',
    links: [
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Instagram', href: 'https://instagram.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  },
];
