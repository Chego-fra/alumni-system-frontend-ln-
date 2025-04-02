import { useState } from 'react';
import { createEvent, updateEvent } from '../../lib/actions';
import { z } from 'zod';
import { eventSchema } from '../../lib/formValidation/eventValidation';

const EventForm = ({ initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate data using Zod
    try {
      eventSchema.parse(formData);
      if (isEdit) {
        await updateEvent(initialData.id, formData);
      } else {
        await createEvent(formData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <span>{errors.date}</span>}
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <span>{errors.location}</span>}
      </div>
      <button type="submit">{isEdit ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
