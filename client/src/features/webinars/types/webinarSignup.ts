export interface WebinarSignup {
  id: number;
  webinarId: number;
  isGuest: boolean; // Флаг, указывающий, является ли пользователь гостем
  userId?: number;
  fullName: string;
  email: string;
  organizationName?: string;
  phoneNumber?: string;
  questions?: string;
  linkViewedAt?: any; // Дата и время просмотра ссылки
  isLinkViewed?: boolean; // Флаг просмотра ссылки
  createdAt: any; // Может быть массивом [year, month, day, hour, minute, second, nano] или строкой
  updatedAt?: any;
}
