import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import api from '../../lib/axios';
import type { Post } from '../../types/post.types';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { 'en-US': enUS },
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: Post;
}

export const PostCalendar: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.get('/posts');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading calendar...</div>;
  if (error) return <div>Error loading posts</div>;

  const events: CalendarEvent[] = posts
    ?.filter((post) => post.scheduledAt)
    .map((post) => ({
      title: post.content.length > 50 ? post.content.substring(0, 50) + '...' : post.content,
      start: new Date(post.scheduledAt!),
      end: new Date(post.scheduledAt!), // Assuming instant event, or add duration if needed
      resource: post,
    })) || [];

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '100%' }}
      />
    </div>
  );
};