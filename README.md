# Professional Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Express.js. This project showcases professional work, skills, and experiences with a beautiful and intuitive user interface.

## Description

This portfolio website features a full-stack implementation with a React frontend and Express.js backend. It includes features like dark/light mode, smooth animations, contact form with email integration, and a responsive design that works across all devices.

## Tech Stack

### Frontend

- React 18.3
- TypeScript 5.8
- Vite 6.2
- Tailwind CSS 3.4
- shadcn-ui (with Radix UI)
- Framer Motion 12.4
- React Query (TanStack Query)
- React Router DOM 7.4
- next-themes (for dark/light mode)

### Backend

- Express.js 4.21
- TypeScript 5.8
- Supabase
- Nodemailer
- Sharp (for image processing)

### Development Tools

- ESLint 9.9
- Prettier 3.2
- TypeScript 5.8
- PostCSS 8.4
- Autoprefixer 10.4

## Features

- 🌓 Dark/Light mode support with next-themes
- 📱 Fully responsive design with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📬 Contact form with email integration via Nodemailer
- 🔒 Secure API endpoints with Express.js
- 🖼️ Image optimization with Sharp
- 🎨 Modern UI components with shadcn-ui
- 📊 Project showcase
- 👤 About section
- 📝 Blog/Articles section
- 🔍 SEO optimization with React Helmet

## Installation & Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# SMTP Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── server/        # Express.js backend
├── providers/     # React context providers
├── lib/           # Utility functions and configurations
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── types/         # TypeScript type definitions
├── data/          # Static data and content
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint` - Run ESLint

## API Documentation

### Contact Form API

- **Endpoint**: `/api/contact`
- **Method**: POST
- **Body**:

```typescript
{
  name: string;
  email: string;
  message: string;
}
```

### Projects API

- **Endpoint**: `/api/projects`
- **Method**: GET
- **Response**: Array of project objects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn-ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [TanStack Query](https://tanstack.com/query/latest) for data fetching
