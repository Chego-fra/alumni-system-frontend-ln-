import { z } from "zod";

export const eventSchema = z.object({
  id: z.coerce.number().optional(), // Optional
  title: z.string().min(1, { message: "Title is required!" }), // Match required
  description: z.string().min(1, { message: "Description is required!" }), // Match required
  date: z.string().min(1, { message: "Event date is required!" }), // Match required
  time: z.string().min(1, { message: "Event time is required!" }), // Match required
  location: z.string().min(1, { message: "Location is required!" }), // Match required
  organizer: z.string().min(1, { message: "Organizer is required!" }), // Match required
  attendees: z.coerce.number().optional(), // Optional
  image: z
  .any()
  .optional()
  .refine((files) => {
    if (!files) return true; // optional
    return files instanceof FileList && files.length > 0 && files[0] instanceof File;
  }, {
    message: "Please upload a valid image.",
  }),

});




export const userSchema = z.object({
  id: z.coerce.number().optional(), // Optional, for updates

  name: z
    .string()
    .min(1, { message: "Name is required!" })
    .max(255, { message: "Name must not exceed 255 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email format!" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .optional()
    .or(z.literal("")), // Allows empty string on update

  role: z
    .string()
    .min(1, { message: "Role is required!" }),
});



export const careerSchema = z.object({
  id: z.coerce.number().optional(),

  title: z.string().min(1, { message: "Title is required!" }),
  company: z.string().min(1, { message: "Company is required!" }),
  location: z.string().min(1, { message: "Location is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  requirements: z.string().min(1, { message: "Requirements are required!" }),
  posted_by: z.string().min(1, { message: "Posted By is required!" }),

  image: z.any().nullable(), // ✅ fixed

  date_posted: z.string().min(1, { message: "Date posted is required!" }),
});





export const gallerySchema = z.object({
  id: z.coerce.number().optional(), // Optional for updates

  title: z
    .string()
    .min(1, { message: "Title is required!" }),

  type: z
    .string()
    .min(1, { message: "Type is required!" })
    .refine((val) => val === "image" || val === "video", {
      message: "Type must be either 'image' or 'video'.",
    }),

  file_path: z
    .string()
    .min(1, { message: "File path is required!" }),

  description: z
    .string()
    .optional()
    .nullable(),

  posted_by: z
    .string()
    .min(1, { message: "Posted By is required!" }),

    date_posted: z.string().min(1, { message: "Date posted is required!" }),
});




export const resourceSchema = z.object({
  // Title is required and should be a string
  title: z.string().min(1, { message: "Title is required!" }),

  // Category is required and should be a string
  category: z.string().min(1, { message: "Category is required!" }),

  // Description is optional, should be a string if provided
  description: z.string().optional(),

  // File URL is optional, should be a string if provided
  file_url: z.string().optional(),

  // Video URL is optional, should be a string if provided
  video_url: z.string().optional(),

  // Posted by is required and should be a string (could be a user ID or name)
  posted_by: z.string().min(1, { message: "Posted by is required!" }),

  // Date posted is required and should be a date string
  date_posted: z.string().min(1, { message: "Date posted is required!" }),

  // Image is optional, should be a string if provided
  image: z.string().optional(),
});



export const RSVPFormSchema = z.object({
  event_id: z.string().min(1, "Event ID is required"),
  alumni_id: z.string().min(1, "Alumni ID is required"),
});
