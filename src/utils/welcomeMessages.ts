// Welcome Message Types
export interface WelcomeMessage {
  greeting: string;
  subtitle: string;
  description: string;
  emoji: string;
}

// Memoize messages to avoid recreating objects
const messages = {
  firstTime: [
    {
      greeting: 'Welcome 🌟',
      subtitle: 'Thanks for visiting! 👋',
      description: 'Explore my portfolio and discover my work 🚀',
      emoji: '🎉',
    },
    {
      greeting: 'Hello 👋',
      subtitle: 'Great to meet you! 🤝',
      description: 'Take a look at my latest projects 💡',
      emoji: '🌈',
    },
  ],
  returning: [
    {
      greeting: 'Welcome Back 🏠',
      subtitle: 'Good to see you again! 😊',
      description: "Check out what's new 🆕",
      emoji: '🌟',
    },
    {
      greeting: 'Hey There 👋',
      subtitle: 'Thanks for returning! 💖',
      description: 'Explore my latest updates 🔍',
      emoji: '🚀',
    },
    {
      greeting: 'Hello Again 🌈',
      subtitle: 'Welcome back to my space 🏡',
      description: 'Discover my newest work 🌟',
      emoji: '✨',
    },
  ],
  frequent: [
    {
      greeting: 'Hi Friend 🤗',
      subtitle: 'Always great to have you here! 💕',
      description: 'Thanks for being a regular visitor 🌟',
      emoji: '🎊',
    },
    {
      greeting: 'Welcome Again 🌈',
      subtitle: 'Thanks for being awesome! 🌟',
      description: 'Your support means a lot 💖',
      emoji: '🚀',
    },
  ],
} as const;

// IP-based message tracking
export const createIPTracker = () => {
  const ipVisitKey = 'site_visitor_ip_visits';

  return {
    incrementVisits: (ip: string) => {
      // Retrieve existing visits or initialize
      const visitsData = JSON.parse(localStorage.getItem(ipVisitKey) || '{}');

      // Increment visits for this IP
      visitsData[ip] = (visitsData[ip] || 0) + 1;

      // Save updated visits
      localStorage.setItem(ipVisitKey, JSON.stringify(visitsData));

      return visitsData[ip];
    },

    getVisitCount: (ip: string) => {
      const visitsData = JSON.parse(localStorage.getItem(ipVisitKey) || '{}');
      return visitsData[ip] || 0;
    },
  };
};

// Utility to get random index
const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

// Get welcome message based on visit count
export const getWelcomeMessage = (visitCount: number): WelcomeMessage => {
  if (visitCount <= 1) {
    return messages.firstTime[getRandomIndex(messages.firstTime.length)];
  } else if (visitCount <= 5) {
    return messages.returning[getRandomIndex(messages.returning.length)];
  } else {
    return messages.frequent[getRandomIndex(messages.frequent.length)];
  }
};
