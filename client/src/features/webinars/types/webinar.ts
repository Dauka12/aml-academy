export interface Webinar {
  id: number;
  title: string;
  description?: string;
  startDate: any[];
  link?: string;
  isActive: boolean;
  imageUrl?: string;
  createdBy: string | number;
  createdAt: string | any[];
  updatedAt?: string | any[];
  signupsCount?: number;
  isSignedUp?: boolean;
  participantsFullNames?: string[];
  type?: 'online' | 'distance'; // Type of webinar (online or distance)
  speaker?: string;  // Speaker name
  rating?: number;    // Rating from 1-5
}

export interface WebinarSignup {
  id: number;
  webinarId: number;
  userId?: number;
  fullName: string;
  email: string;
  questions?: string;
  createdAt: string | any[];
  updatedAt?: string | any[];
}
