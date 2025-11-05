import { Mood } from '@/types';
import { apiClient } from '../apiClient';

/**
 * Moods API Service
 * Connects to backend REST API endpoints for mood tracking
 */

export const moodsApi = {
  /**
   * GET /api/moods
   * Returns all mood entries
   */
  async getMoods(startDate?: string, endDate?: string): Promise<Mood[]> {
    let endpoint = '/moods';
    if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }
    return apiClient.get<Mood[]>(endpoint);
  },

  /**
   * POST /api/moods
   * Creates a new mood entry
   */
  async createMood(moodData: Omit<Mood, 'id' | 'createdAt'>): Promise<Mood> {
    return apiClient.post<Mood>('/moods', moodData);
  },

  /**
   * GET /api/moods/latest
   * Returns the most recent mood entry
   */
  async getLatestMood(): Promise<Mood | null> {
    return apiClient.get<Mood | null>('/moods/latest');
  },
};