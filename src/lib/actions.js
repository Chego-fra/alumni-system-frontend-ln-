"use client"

import axios from "./axios";
import { eventSchema } from "./formValidationSchemas"; // Import validation schema
import { toast } from "react-toastify"; // Add toast for user feedback
import { useRouter } from "next/navigation"; // Use for redirection after success
import { toFormData } from "./utils"; // 👈 import the helper

export const createEvent = async (formData) => {
  try {
    const fd = toFormData(formData); // 👈 convert your object into FormData

    const response = await axios.post("/api/v1/events", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      toast.success("Event created successfully!");
      window.location.reload();
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong! Please try again.");
    return { success: false, error: true };
  }
};




export const updateEvent = async (id, formData) => {
  try {
    const fd = toFormData(formData); // convert JS object to FormData

    const response = await axios.post(`/api/v1/events/${id}?_method=PUT`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      window.location.reload(); // Reload on success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};


export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/events/${id}`);
    if (response.status === 204) {
      window.location.reload(); // Reload on success
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false };
  }
};



// Create a new user
export const createUser = async (formData) => {
  try {
    const response = await axios.post("/api/v1/users", formData);

    if (response.status === 201 || response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Create user error:", err);
    return { success: false, error: true };
  }
};

// Update an existing user
export const updateUser = async (id, formData) => {
  try {
    const response = await axios.put(`/api/v1/users/${id}`, formData);

    if (response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Update user error:", err);
    return { success: false, error: true };
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/users/${id}`);

    if (response.status === 204) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true };
  } catch (err) {
    console.error("Delete user error:", err);
    return { success: false };
  }
};




// Create a new career
export const createCareer = async (formData) => {
  try {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    const response = await axios.post("/api/v1/career", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Create career error:", err.response?.data || err.message);
    return { success: false, error: true };
  }
};


// Update an existing career
export const updateCareer = async (id, formData) => {
  try {
    const response = await axios.put(`/api/v1/career/${id}`, formData);

    if (response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Update career error:", err);
    return { success: false, error: true };
  }
};

// Delete a career
export const deleteCareer = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/career/${id}`);

    if (response.status === 204) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true };
  } catch (err) {
    console.error("Delete career error:", err);
    return { success: false };
  }
};


// Create a new gallery item
export const createGallery = async (formData) => {
  try {
    const response = await axios.post("/api/v1/gallery", formData);

    if (response.status === 201 || response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Create gallery error:", err);
    return { success: false, error: true };
  }
};

// Update an existing gallery item
export const updateGallery = async (id, formData) => {
  try {
    const response = await axios.put(`/api/v1/gallery/${id}`, formData);

    if (response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Update gallery error:", err);
    return { success: false, error: true };
  }
};

// Delete a gallery item
export const deleteGallery = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/gallery/${id}`);

    if (response.status === 204) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true };
  } catch (err) {
    console.error("Delete gallery error:", err);
    return { success: false };
  }
};

// Get a single gallery item
export const getGallery = async (id) => {
  try {
    const response = await axios.get(`/api/v1/gallery/${id}`);

    if (response.status === 200) {
      return { success: true, data: response.data };
    }

    return { success: false };
  } catch (err) {
    console.error("Get gallery error:", err);
    return { success: false };
  }
};


export const createResource = async (formData) => {
  try {
    const fd = toFormData(formData); // Convert object to FormData

    const response = await axios.post("/api/v1/resources", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      toast.success("Resource created successfully!");
      window.location.reload(); // Optionally reload after successful creation
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong! Please try again.");
    return { success: false, error: true };
  }
};


export const updateResource = async (id, formData) => {
  try {
    const fd = toFormData(formData); // Convert JS object to FormData

    const response = await axios.post(`/api/v1/resources/${id}?_method=PUT`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      window.location.reload(); // Optionally reload after successful update
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong! Please try again.");
    return { success: false, error: true };
  }
};


export const deleteResource = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/resources/${id}`);
    if (response.status === 204) {
      window.location.reload(); // Optionally reload after successful deletion
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    toast.error("Failed to delete the resource.");
    return { success: false };
  }
};




// If RSVP doesn't require FormData, keep it simple JSON. Otherwise, use toFormData like in events.
export const createRSVP = async (formData) => {
  try {
    const response = await axios.post("/api/v1/rsvps", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("RSVP created successfully!");
      window.location.reload(); // or router.refresh() if using Next.js App Router
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    toast.error("Failed to create RSVP.");
    return { success: false, error: true };
  }
};

export const updateRSVP = async (id, formData) => {
  try {
    const response = await axios.post(`/api/v1/rsvps/${id}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("RSVP updated successfully!");
      window.location.reload();
    }

    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    toast.error("Failed to update RSVP.");
    return { success: false, error: true };
  }
};

export const deleteRSVP = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/rsvps/${id}`);
    if (response.status === 204) {
      toast.success("RSVP deleted successfully!");
      window.location.reload();
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to delete RSVP:", error);
    toast.error("Failed to delete RSVP.");
    return { success: false };
  }
};
