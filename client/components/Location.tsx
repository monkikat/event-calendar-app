"use client";

import Image from 'next/image';
import { EventTM } from "@/types";
import { useEffect, useState } from "react";

import crossIcon from "../public/crossIcon.svg";

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

        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextDateString = nextDate.toISOString().split("T")[0];
    
        const res = await fetch(
            `/api/events?lat=${location.lat}&lon=${location.lon}&date=${nextDateString}`
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
                                    {new Date(
                                    `${event.dates.start.localDate}T${event.dates.start.localTime}`
                                    ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    })}
                                </span>
                                )}
                                {event.dates.start.localDate && (
                                <span className='text-darkCustLight font-semibold'>
                                    {new Date(event.dates.start.localDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    })}
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

/*
<div className="h-full overflow-y-auto">
    <div>Selected Date = {selectedDate}</div>
    <div>Location = {location ? `${location.lat}, ${location.lon}` : 'Not available'}</div>
    <h1>Events for {selectedDate}</h1>
    {events.length === 0 ? (
        <p>No events found.</p>
    ) : (
        <ul>
        {events.map((event) => (
            <li key={event.id}>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
                {event.name} - {event.dates.start.localDate}
            </a>
            </li>
        ))}
        </ul>
    )}
</div>
*/