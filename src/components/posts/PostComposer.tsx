import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { PostStatus } from '@/types/post.types';
import {
  POPULAR_TIMEZONES,
  getCurrentTimeInTimezone,
  getMinScheduleDateTime,
  getCurrentDateTimeInTimezone,
  validateScheduledTime
} from '@/utils/timezone';

const postSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Content too long'),
  scheduledAt: z.string().optional(),
  timezone: z.string().min(1, 'Timezone is required'),
  status: z.enum(['DRAFT', 'SCHEDULED']).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostComposerProps {
  onPostCreated?: () => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [currentTime, setCurrentTime] = useState<string>(
    getCurrentTimeInTimezone(selectedTimezone)
  );
  const [minDateTime, setMinDateTime] = useState<string>(getMinScheduleDateTime());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      timezone: selectedTimezone,
      status: 'SCHEDULED',
    },
  });

  const scheduledAt = watch('scheduledAt');

  // Update min datetime every minute to prevent past selection
  useEffect(() => {
    const interval = setInterval(() => {
      setMinDateTime(getMinScheduleDateTime());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Update current time when timezone changes
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    setCurrentTime(getCurrentTimeInTimezone(newTimezone));
    setValue('timezone', newTimezone);

    // Update the datetime picker to show current time in new timezone
    const currentDateTimeInTz = getCurrentDateTimeInTimezone(newTimezone);
    setMinDateTime(currentDateTimeInTz);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PostFormData, isDraft: boolean = false) => {
    try {
      setError('');
      setSuccess('');

      // Validate scheduled time if not a draft
      if (!isDraft && data.scheduledAt) {
        const validation = validateScheduledTime(data.scheduledAt);
        if (!validation.valid) {
          setError(validation.error || 'Invalid scheduled time');
          return;
        }
      }

      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('timezone', data.timezone);

      if (isDraft || !data.scheduledAt) {
        formData.append('status', PostStatus.DRAFT);
      } else {
        formData.append('scheduledAt', new Date(data.scheduledAt).toISOString());
        formData.append('status', PostStatus.SCHEDULED);
      }

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(isDraft ? 'Draft saved successfully!' : 'Post scheduled successfully!');
      reset();
      setImageFile(null);
      setImagePreview('');

      // Call callback to refresh post list
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      setError(errorMessage);
      console.error('Post creation failed:', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>Schedule your social media post</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {success}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              rows={4}
              {...register('content')}
              className={errors.content ? 'border-destructive' : ''}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image (Optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="max-w-full h-48 object-cover rounded-md" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {POPULAR_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              {currentTime && (
                <p className="text-xs text-muted-foreground">
                  Current time: {currentTime}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledAt">Schedule For (Optional)</Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                min={minDateTime}
                {...register('scheduledAt')}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to save as draft
              </p>
              {scheduledAt && (
                <p className="text-xs text-blue-600">
                  Will publish in {selectedTimezone}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleSubmit((data) => onSubmit(data, true))}
              className="flex-1"
            >
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};