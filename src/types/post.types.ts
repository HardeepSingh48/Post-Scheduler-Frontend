// Post types matching backend
export const PostStatus = {
    DRAFT: 'DRAFT',
    SCHEDULED: 'SCHEDULED',
    PUBLISHING: 'PUBLISHING',
    PUBLISHED: 'PUBLISHED',
    FAILED: 'FAILED',
} as const;

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];

export interface Post {
    id: string;
    content: string;
    imageUrl: string | null;
    imagePath: string | null;
    scheduledAt: Date | null;
    timezone: string;
    status: PostStatus;
    attempts: number;
    lastError: string | null;
    publishedAt: Date | null;
    userId: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePostInput {
    content: string;
    scheduledAt?: Date;
    timezone: string;
    status?: PostStatus;
    image?: File;
}

export interface UpdatePostInput {
    content?: string;
    scheduledAt?: Date | null;
    timezone?: string;
    status?: PostStatus;
    image?: File;
}
