import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required').max(280, 'Content must be less than 280 characters'),
  scheduledAt: z.string().optional(),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;