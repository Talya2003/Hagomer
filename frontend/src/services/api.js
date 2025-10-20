import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Calendar API
export const calendarAPI = {
  // Get calendar with date range
  getCalendar: async (startDate, endDate) => {
    const response = await api.get('/api/calendar', {
      params: { start: startDate, end: endDate }
    });
    return response.data;
  },
};

// Events API
export const eventsAPI = {
  // Get all events
  getAll: async () => {
    const response = await api.get('/api/events');
    return response.data;
  },

  // Get events by date
  getByDate: async (date) => {
    const response = await api.get('/api/events', {
      params: { date }
    });
    return response.data;
  },

  // Get single event
  getById: async (id) => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },

  // Create event
  create: async (eventData) => {
    const response = await api.post('/api/events', eventData);
    return response.data;
  },

  // Update event
  update: async (id, eventData) => {
    const response = await api.put(`/api/events/${id}`, eventData);
    return response.data;
  },

  // Delete event
  delete: async (id) => {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  },
};

export default api;