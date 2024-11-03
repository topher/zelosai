// pages/dashboard/schedule/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import { ScheduledEvent } from '@/app/types';
import { mapScheduledEvents } from '@/utils/mapScheduledEvents';
import { useAuth } from '@clerk/nextjs'; // Using Clerk for authentication
import { Montserrat } from 'next/font/google';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircledIcon } from '@radix-ui/react-icons';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const SchedulePage: React.FC = () => {
  const { userId, orgId } = useAuth(); // Destructure orgId from Clerk's useUser
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
      const ownerId = userId; // Get ownerId from Clerk's user object

      const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/resource/scheduled_events`);
          
          if (response.ok) {
            const data = await response.json();
            const scheduledEvents: ScheduledEvent[] = data.resources;
            const calendarEvents = mapScheduledEvents(scheduledEvents);
            setEvents(calendarEvents);
          } else {
            console.error('Error fetching scheduled events:', response.statusText);
            setError('Failed to load scheduled events.');
          }
        } catch (err) {
          console.error('Error fetching scheduled events:', err);
          setError('Failed to load scheduled events.');
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [userId, orgId]);

  if (loading) {
    return <div className="p-4">Loading scheduled events...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background p-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${montserrat.className}`}>Scheduled Events</h1>
          <Link href="/dashboard/schedule/new">
            <Button>
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              Add New Event
            </Button>
          </Link>
        </div>
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default SchedulePage;
