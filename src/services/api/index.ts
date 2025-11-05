/**
 * API Services Index
 * Exports all API services in a centralized location
 * 
 * This structure mimics a REST API and can be easily replaced
 * with actual fetch() calls to a real backend:
 * 
 * Before: await tasksApi.getTasks()
 * After:  await fetch('/api/tasks').then(r => r.json())
 */

export { tasksApi } from './tasks';
export { moodsApi } from './moods';
export { habitsApi } from './habits';
export { eventsApi } from './events';
export { analyticsApi } from './analytics';