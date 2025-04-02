"use server"
import axios from "./axios";


export const createEvent = async (eventData) => {
  try {
    const response = await axios.post('/api/events', eventData);
    return response.data;
  } catch (error) {
    error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`/api/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await axios.delete(`/api/events/${id}`);
    return id;
  } catch (error) {
    error('Error deleting event:', error);
    throw error;
  }
};
