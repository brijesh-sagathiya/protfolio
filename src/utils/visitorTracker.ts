const VISITOR_KEY = 'visitor_data';
const IP_CACHE_KEY = 'ip_cache';
const IP_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface VisitorData {
  ip: string;
  visitCount: number;
  lastVisit: number;
}

interface IpCache {
  ip: string;
  timestamp: number;
}

// Get cached IP or fetch new one
const getCachedIP = async (): Promise<string> => {
  const cachedData = localStorage.getItem(IP_CACHE_KEY);
  if (cachedData) {
    const ipCache: IpCache = JSON.parse(cachedData);
    if (Date.now() - ipCache.timestamp < IP_CACHE_DURATION) {
      return ipCache.ip;
    }
  }

  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;

    localStorage.setItem(
      IP_CACHE_KEY,
      JSON.stringify({
        ip,
        timestamp: Date.now(),
      })
    );

    return ip;
  } catch {
    return 'unknown';
  }
};

// Get initial visitor data synchronously
export const getInitialVisitorData = (): VisitorData => {
  const storedData = localStorage.getItem(VISITOR_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return {
    ip: 'unknown',
    visitCount: 1,
    lastVisit: Date.now(),
  };
};

// Update visitor data asynchronously
export const updateVisitorData = async (): Promise<void> => {
  try {
    const currentIp = await getCachedIP();
    const storedData = localStorage.getItem(VISITOR_KEY);
    let visitorData: VisitorData | null = storedData ? JSON.parse(storedData) : null;

    if (!visitorData || visitorData.ip !== currentIp) {
      visitorData = {
        ip: currentIp,
        visitCount: 1,
        lastVisit: Date.now(),
      };
    } else {
      visitorData = {
        ...visitorData,
        visitCount: visitorData.visitCount + 1,
        lastVisit: Date.now(),
      };
    }

    localStorage.setItem(VISITOR_KEY, JSON.stringify(visitorData));
  } catch (error) {
    console.warn('Failed to update visitor data:', error);
  }
};
