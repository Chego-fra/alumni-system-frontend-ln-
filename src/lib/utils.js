// lib/utils.js

export const toFormData = (data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    });
    return fd;
  };
  