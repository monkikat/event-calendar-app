import { NextRequest, NextResponse } from 'next/server';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date");
  const startDateTime = searchParams.get("startDateTime");
  const endDateTime = searchParams.get("endDateTime");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  let url;
  
  // Handle both single date and date range requests
  if (date) {
    // Single date request
    const startDate = `${date}T00:00:00Z`;
    const endDate = `${date}T23:59:59Z`;
    url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=25&unit=miles&startDateTime=${startDate}&endDateTime=${endDate}`;
  } else if (startDateTime && endDateTime) {
    // Date range request
    url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=25&unit=miles&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
  } else {
    return NextResponse.json({ error: "Missing date parameters" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
