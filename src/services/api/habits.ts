import { Habit } from '@/types';
import { apiClient } from '../apiClient';

/**
 * Habits API Service
 * Connects to backend REST API endpoints for habit tracking
 */

export const habitsApi = {
  /**
   * GET /api/habits
   * Returns all habits, optionally filtered by category
   */
  async getHabits(category?: string): Promise<Habit[]> {
    const endpoint = category && category !== 'all' 
      ? `/habits?category=${category}` 
      : '/habits';
    return apiClient.get<Habit[]>(endpoint);
  },

  /**
   * POST /api/habits
   * Creates a new habit
   */
  async createHabit(habitData: Omit<Habit, 'id' | 'createdAt' | 'streak'>): Promise<Habit> {
    return apiClient.post<Habit>('/habits', habitData);
  },

  /**
   * PUT /api/habits/:id/toggle
   * Toggles habit completion and updates streak
   */
  async toggleHabit(id: string): Promise<Habit> {
    return apiClient.put<Habit>(`/habits/${id}/toggle`, {});
  },

  /**
   * DELETE /api/habits/:id
   * Deletes a habit
   */
  async deleteHabit(id: string): Promise<void> {
    return apiClient.delete<void>(`/habits/${id}`);
  },
};