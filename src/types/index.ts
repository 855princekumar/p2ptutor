export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export type UserRole = 'tutor' | 'trainee';