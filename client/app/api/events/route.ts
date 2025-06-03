import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date");
  const startDateTime = searchParams.get("startDateTime");
  const endDateTime = searchParams.get("endDateTime");

  if (!lat || !lon) {
    return NextResponse.json( { status: 400 });
  }

  let url;
  
  if (date) {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + 1);
    const adjustedDate = dateObj.toISOString().split('T')[0];
    
    const startDate = `${adjustedDate}T00:00:00Z`;
    const endDate = `${adjustedDate}T23:59:59Z`;
    
    console.log(`Original date: ${date}, Adjusted date: ${adjustedDate}`);
    
    url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=25&unit=miles&startDateTime=${startDate}&endDateTime=${endDate}`;
  } else if (startDateTime && endDateTime) {
    url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=25&unit=miles&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
  } else {
    return NextResponse.json( { status: 400 });
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
