export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'study' | 'self-care' | 'hobbies' | 'work';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface Mood {
  id: string;
  mood: number;
  energy: number;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  category: 'study' | 'self-care' | 'hobbies' | 'all';
  streak: number;
  completed: boolean;
  lastCompleted?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  category: 'study' | 'self-care' | 'hobbies' | 'work';
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface TimeAnalytics {
  category: string;
  totalMinutes: number;
  taskCount: number;
}