"use client";

import { EventTM } from "@/types";
import { useEffect, useState } from "react";


const Location = ({ selectedDate } : { selectedDate: string}) => {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [events, setEvents] = useState<EventTM[]>([]);

    useEffect(() => {
        if (!navigator.geolocation) {
        console.error("Geolocation not supported");
        return;
        }
    
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
            console.error("Geolocation error:", err.message);
        }
        );
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
        if (!location) return;

        const res = await fetch(
            `/api/events?lat=${location.lat}&lon=${location.lon}&date=${selectedDate}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setEvents(data._embedded?.events || []);
        };
    
        fetchEvents();
    }, [location, selectedDate]);

  return (
    <div className="h-full w-full space-y-8 px-12">
        {events.length === 0 ? (
            <p className='pb-8 pl-4 pt-4 text-center md:mb-12'>Oops there are no events on this date. </p>
        ) : (
            <ul className="space-y-2 max-h-[80vh] w-full px-4 mb-12 lg:mb-0 lg:max-h-[45vh]">
            {events.map((event) => (
                <li key={event.id} className="pb-4">
                    <a href={event.url} target="_blank" rel="noopener noreferrer"
                    className='flex justify-between'>
                        <div className="font-semibold">{event.name}</div>
                        <div className="text-sm text-end">
                            <div className="flex flex-col text-sm">
                                {event.dates.start.localTime && (
                                <span>
                                    {(() => {
                                      const [hours, minutes] = event.dates.start.localTime.split(':').map(Number);
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
                                      const [year, month, day] = event.dates.start.localDate.split('-').map(Number);
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
    </div>
  )
}

export default Location

