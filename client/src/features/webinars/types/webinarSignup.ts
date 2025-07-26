export interface WebinarSignup {
  id: number;
  webinarId: number;
  userId?: number;
  fullName: string;
  email: string;
  organizationName?: string;
  phoneNumber?: string;
  questions?: string;
  createdAt: any; // Может быть массивом [year, month, day, hour, minute, second, nano] или строкой
  updatedAt?: any;
}
