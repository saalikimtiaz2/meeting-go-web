/* eslint-disable no-unused-vars */
// src/hooks/useScheduleMeeting.tsx

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ScheduleMeetingParams {
  roomName: string;
  dateTime: string;
  duration: number;
  email: string[];
}

interface ScheduleMeetingResult {
  scheduleMeeting: (params: ScheduleMeetingParams) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useScheduleMeeting = (): ScheduleMeetingResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheduleMeeting = async ({
    roomName,
    dateTime,
    duration,
    email,
  }: ScheduleMeetingParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/schedule-meeting', {
        roomName,
        dateTime,
        duration,
        email,
      });

      const { roomUrl, token } = response.data;
      // Assuming you will handle the redirection in the component
      window.location.href = `/room/${roomName}?roomUrl=${encodeURIComponent(
        roomUrl,
      )}&token=${token}`;
    } catch (error) {
      setError('Failed to schedule meeting. Please try again.');
      toast.error('Failed to schedule meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { scheduleMeeting, loading, error };
};

export default useScheduleMeeting;
