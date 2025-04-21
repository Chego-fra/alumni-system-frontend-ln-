"use client"

import axios from "./axios";
import { eventSchema } from "./formValidationSchemas"; // Import validation schema
import { toast } from "react-toastify"; // Add toast for user feedback
import { useRouter } from "next/navigation"; // Use for redirection after success
import { toFormData } from "./utils"; // 👈 import the helper



// Create a new user
export const createAlumni = async (formData) => {
  try {
    const response = await axios.post("api/v1/alumniProfile", formData);

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
export const updateAlumni = async (id, formData) => {
  try {
    const response = await axios.put(`api/v1/alumniProfile/${id}`, formData);

    if (response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Update Alumni error:", err);
    return { success: false, error: true };
  }
};

// Delete a user
export const deleteAlumni = async (id) => {
  try {
    const response = await axios.delete(`api/v1/alumniProfile/${id}`);

    if (response.status === 204) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true };
  } catch (err) {
    console.error("Delete Alumni error:", err);
    return { success: false };
  }
};






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




export const createCareer = async (formData) => {
  try {
    const response = await axios.post("/api/v1/career", formData);

    if (response.status === 201 || response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Create user error:", err);
    return { success: false, error: true };
  }
};

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



export const createRSVP = async (formData) => {
  try {
    const response = await axios.post("/api/v1/rsvps", formData);

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
export const updateRSVP = async (id, formData) => {
  try {
    const response = await axios.put(`/api/v1/rsvps/${id}`, formData);

    if (response.status === 200) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Update Alumni error:", err);
    return { success: false, error: true };
  }
};

// Delete a user
export const deleteRSVP = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/rsvps/${id}`);

    if (response.status === 204) {
      window.location.reload(); // Reload the page after success
    }

    return { success: true };
  } catch (err) {
    console.error("Delete Alumni error:", err);
    return { success: false };
  }
};