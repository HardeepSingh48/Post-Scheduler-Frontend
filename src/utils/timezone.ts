// Popular timezones grouped by region
export const POPULAR_TIMEZONES = [
  // North America
  { value: 'America/New_York', label: 'Eastern Time (ET)', region: 'North America' },
  { value: 'America/Chicago', label: 'Central Time (CT)', region: 'North America' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', region: 'North America' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', region: 'North America' },
  { value: 'America/Phoenix', label: 'Arizona (MST)', region: 'North America' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)', region: 'North America' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', region: 'North America' },

  // Europe
  { value: 'Europe/London', label: 'London (GMT/BST)', region: 'Europe' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)', region: 'Europe' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', region: 'Europe' },
  { value: 'Europe/Rome', label: 'Rome (CET/CEST)', region: 'Europe' },
  { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)', region: 'Europe' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)', region: 'Europe' },

  // Asia
  { value: 'Asia/Dubai', label: 'Dubai (GST)', region: 'Asia' },
  { value: 'Asia/Kolkata', label: 'India (IST)', region: 'Asia' },
  { value: 'Asia/Shanghai', label: 'China (CST)', region: 'Asia' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', region: 'Asia' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)', region: 'Asia' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', region: 'Asia' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', region: 'Asia' },

  // Australia & Pacific
  { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', region: 'Australia' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEDT/AEST)', region: 'Australia' },
  { value: 'Australia/Perth', label: 'Perth (AWST)', region: 'Australia' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)', region: 'Pacific' },

  // South America
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', region: 'South America' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (ART)', region: 'South America' },

  // Africa
  { value: 'Africa/Cairo', label: 'Cairo (EET)', region: 'Africa' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', region: 'Africa' },
];

// Get current time in a specific timezone
export const getCurrentTimeInTimezone = (timezone: string): string => {
  try {
    const now = new Date();
    return now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error getting time for timezone:', timezone, error);
    return '';
  }
};

// Get minimum datetime for scheduling in local browser time
export const getMinScheduleDateTime = (): string => {
  const now = new Date();
  // Add 1 minute to ensure we don't schedule in the past
  now.setMinutes(now.getMinutes() + 1);
  // Format for datetime-local input: YYYY-MM-DDTHH:mm
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Get current datetime in specific timezone for datetime-local input
export const getCurrentDateTimeInTimezone = (timezone: string): string => {
  try {
    const now = new Date();

    // Get the time in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;

    return `${year}-${month}-${day}T${hour}:${minute}`;
  } catch (error) {
    console.error('Error getting datetime for timezone:', timezone, error);
    return getMinScheduleDateTime();
  }
};

// Validate if scheduled time is in the future
export const validateScheduledTime = (scheduledAt: string): { valid: boolean; error?: string } => {
  try {
    const scheduledDate = new Date(scheduledAt);
    const now = new Date();

    // Add 30 seconds buffer to account for form submission time
    const minAllowedTime = new Date(now.getTime() + 30000);

    if (scheduledDate <= minAllowedTime) {
      return {
        valid: false,
        error: 'Scheduled time must be at least 1 minute in the future. Please select a later time.',
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid date format. Please select a valid date and time.',
    };
  }
};

// Get user's current timezone
export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Format date in specific timezone
export const formatDateInTimezone = (date: string | Date, timezone: string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date(date).toLocaleString();
  }
};