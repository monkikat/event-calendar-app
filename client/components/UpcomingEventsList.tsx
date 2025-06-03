"use client";

import { EventTM } from '@/types';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react'

// Type for cached events data
interface CachedEventsData {
  events: EventTM[];
  timestamp: number;
  location: { lat: number; lon: number };
  dateRange: { start: string; end: string };
}

// Cache expiration time in milliseconds (10 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000;

// Local storage key
const EVENTS_CACHE_KEY = 'upcomingEventsCache';


const UpcomingEventsList = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [events, setEvents] = useState<EventTM[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        setError(`Geolocation error: ${err.message}`);
        console.error("Geolocation error:", err.message);
      }
    );
  }, []);

  // Function to check if location has changed significantly
  const hasLocationChanged = (cachedLocation: { lat: number; lon: number }, currentLocation: { lat: number; lon: number }) => {
    // Check if location has changed by more than 0.01 degrees (roughly 1km)
    const latDiff = Math.abs(cachedLocation.lat - currentLocation.lat);
    const lonDiff = Math.abs(cachedLocation.lon - currentLocation.lon);
    return latDiff > 0.01 || lonDiff > 0.01;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!location) return;
      
      // Try to get cached data from localStorage
      let shouldFetchFromAPI = true;
      let cachedData: CachedEventsData | null = null;
      
      try {
        const cachedString = localStorage.getItem(EVENTS_CACHE_KEY);
        if (cachedString) {
          cachedData = JSON.parse(cachedString) as CachedEventsData;
          
          // Check if cache is still valid
          const now = Date.now();
          const isExpired = now - cachedData.timestamp > CACHE_EXPIRATION;
          const locationChanged = hasLocationChanged(cachedData.location, location);
          
          if (!isExpired && !locationChanged) {
            // Use cached data
            setEvents(cachedData.events);
            shouldFetchFromAPI = false;
            console.log('Using cached events data');
          } else {
            console.log('Cache expired or location changed, fetching new data');
          }
        }
      } catch (error) {
        console.error('Error reading from cache:', error);
        // If there's an error reading the cache, we'll fetch from API
      }
      
      if (!shouldFetchFromAPI) return;
      
      setIsLoading(true);
      setError(null);
      
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setDate(currentDate.getDate() + 30);
      
      const newDateRange = {
        start: currentDate.toLocaleDateString(),
        end: endDate.toLocaleDateString()
      };
            
      const startDateTime = currentDate.toISOString().split('.')[0] + 'Z'; // Format: YYYY-MM-DDTHH:mm:ssZ
      const endDateTime = endDate.toISOString().split('.')[0] + 'Z';
      
      try {
        // Make a single API call with date range
        const res = await fetch(
          `/api/events?lat=${location.lat}&lon=${location.lon}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
        );
        
        if (!res.ok) {
          throw new Error(`Error fetching events: ${res.status}`);
        }
        
        const data = await res.json();
        const fetchedEvents = data._embedded?.events || [];
        setEvents(fetchedEvents);
        
        // Save to localStorage with current timestamp
        const cacheData: CachedEventsData = {
          events: fetchedEvents,
          timestamp: Date.now(),
          location: { ...location },
          dateRange: newDateRange
        };
        
        localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify(cacheData));
        console.log('Events data cached');
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvents();
  }, [location]); // Re-run when location changes

  return (
    <motion.div className="px-12"
    initial={{
      opacity: 0
    }}
    animate={{
      opacity: 1
    }}
    transition={{
      duration: 0.2,
      delay: 0.2
    }}>
      {isLoading && (
        <div className="text-center py-4">
          <p>Loading events...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {!isLoading && !error && events.length === 0 ? (
        <p className="text-gray-500">No events found in the next 30 days.</p>
      ) : (
        <ul className="space-y-2 max-h-[50vh] overflow-y-auto hide-scrollbar"
        >
          {events.map((event) => (
            <li key={event.id} className="pb-4">
              <a 
                href={event.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-600 transition-colors flex justify-between space-x-4"
              >
                <div className="font-semibold text-sm">{event.name}</div>
                <div className="text-xs text-end xl:text-sm">
                  <div className="flex flex-col text-sm">
                    {event.dates.start.localTime && (
                      <span>
                        {(() => {
                          // Parse the time parts directly from the string
                          const [hours, minutes] = event.dates.start.localTime.split(':').map(Number);
                          // Create a date object with the local timezone
                          const date = new Date();
                          date.setHours(hours);
                          date.setMinutes(minutes);
                          return date.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                        })()}
                      </span>
                    )}
                    {event.dates.start.localDate && (
                      <span className='text-darkCustLight font-semibold'>
                        {(() => {
                          // Parse the date parts directly from the string to avoid timezone issues
                          const [year, month, day] = event.dates.start.localDate.split('-').map(Number);
                          // Create a date object with the local timezone
                          const date = new Date(year, month - 1, day);
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        })()}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default UpcomingEventsList
