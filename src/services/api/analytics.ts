import { TimeAnalytics } from '@/types';
import { apiClient } from '../apiClient';

/**
 * Analytics API Service
 * Connects to backend REST API endpoints for analytics data
 */

export const analyticsApi = {
  /**
   * GET /api/time-summary
   * Returns time spent per category based on tasks and events
   */
  async getTimeSummary(startDate?: string, endDate?: string): Promise<TimeAnalytics[]> {
    let endpoint = '/time-summary';
    if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }
    return apiClient.get<TimeAnalytics[]>(endpoint);
  },

  /**
   * GET /api/analytics/mood-trends
   * Returns mood analytics
   */
  async getMoodTrends(days: number = 7): Promise<any> {
    return apiClient.get<any>(`/analytics/mood-trends?days=${days}`);
  },
};