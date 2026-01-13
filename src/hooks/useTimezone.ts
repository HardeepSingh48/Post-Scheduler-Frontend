import { useState, useEffect } from 'react';
import { getUserTimezone } from '../utils/timezone';

export const useTimezone = () => {
  const [timezone, setTimezone] = useState<string>('UTC');

  useEffect(() => {
    setTimezone(getUserTimezone());
  }, []);

  return timezone;
};