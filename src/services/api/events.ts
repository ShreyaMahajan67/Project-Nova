import { Event } from '@/types';
import { apiClient } from '../apiClient';

/**
 * Events API Service
 * Connects to backend REST API endpoints for calendar events
 */

export const eventsApi = {
  /**
   * GET /api/events
   * Returns events, optionally filtered by date range
   */
  async getEvents(startDate?: string, endDate?: string): Promise<Event[]> {
    let endpoint = '/events';
    if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }
    return apiClient.get<Event[]>(endpoint);
  },

  /**
   * POST /api/events
   * Creates a new event
   */
  async createEvent(eventData: Omit<Event, 'id' | 'createdAt'>): Promise<Event> {
    return apiClient.post<Event>('/events', eventData);
  },

  /**
   * DELETE /api/events/:id
   * Deletes an event
   */
  async deleteEvent(id: string): Promise<void> {
    return apiClient.delete<void>(`/events/${id}`);
  },
};