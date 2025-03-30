/**
 * Visitor tracking configuration
 */
export interface VisitorConfig {
  storageKey: string;
  expiryDays: number;
}

/**
 * Visitor data
 */
export interface VisitorData {
  count: number;
  lastVisit: string;
}

/**
 * IP cache data
 */
export interface IpCache {
  [key: string]: {
    count: number;
    lastVisit: number;
  };
}
