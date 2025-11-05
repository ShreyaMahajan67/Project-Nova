import { Task } from '@/types';
import { apiClient } from '../apiClient';

/**
 * Tasks API Service
 * Connects to backend REST API endpoints for task management
 */

export const tasksApi = {
  /**
   * GET /api/tasks
   * Returns all tasks
   */
  async getTasks(category?: string): Promise<Task[]> {
    const endpoint = category && category !== 'all' 
      ? `/tasks?category=${category}` 
      : '/tasks';
    return apiClient.get<Task[]>(endpoint);
  },

  /**
   * POST /api/tasks
   * Creates a new task
   */
  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    return apiClient.post<Task>('/tasks', taskData);
  },

  /**
   * PUT /api/tasks/:id
   * Updates an existing task
   */
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return apiClient.put<Task>(`/tasks/${id}`, updates);
  },

  /**
   * DELETE /api/tasks/:id
   * Deletes a task
   */
  async deleteTask(id: string): Promise<void> {
    return apiClient.delete<void>(`/tasks/${id}`);
  },
};