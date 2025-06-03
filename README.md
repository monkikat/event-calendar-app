# Event Calendar App

A full-year interactive calendar built with **Next.js**, **TypeScript**, and **Tailwind CSS**, which allows users to explore upcoming events based on their selected date and location. Events are fetched from the **Ticketmaster API**, and previously fetched results are cached for a smooth experience.

## 🚀 Features

- Full-year calendar view with month and date navigation  
- Location-based event lookup using browser geolocation  
- Click a date to view events happening nearby  
- Efficient data fetching and local caching  
- Responsive and accessible UI  
- Built with clean design using Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)  
- **API**: [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/)  
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🖼️ Preview

![client/public/EventCalendarGif.gif](https://github.com/monkikat/event-calendar-app/blob/main/client/public/EventCalendarGif.gif)

## 📦 To Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/monkikat/event-calendar-app.git
   cd event-calendar-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your Ticketmaster API key:

   ```bash
   NEXT_PUBLIC_TICKETMASTER_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📂 Project Structure

```bash
.
├── components/         # Reusable UI components
├── lib/                # Utility functions (e.g., calendar logic)
├── pages/              # Next.js page routes
├── public/             # Static assets
├── styles/             # Tailwind config and globals
├── types/              # TypeScript interfaces and types
└── .env.local          # Environment variables (not committed)
```
