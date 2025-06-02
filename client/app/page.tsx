"use client";

import { FullYearCalendar } from "@/components";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { useAnimation } from "motion/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // ~1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const controls = useAnimation();

  useEffect(() => {
      const sequence = async () => {
      await controls.start({
          right: "0%",
          translateX: "0%",
          transition: { 
          delay: 0.6,
          duration: 0.7, 
          ease: "easeOut" 
          },
      });
      await controls.start({
          bottom: "0%",
          translateY: "0%",
          transition: { 
          delay: 0.1,
          duration: 0.6, 
          ease: "easeIn" 
          },
      });
      };

      sequence();
  }, [controls]);

  return (
    <main className="overflow-y-auto overflow-x-clip flex flex-col w-full bg-darkCust">
      {
        isLoading ? (
          <LoadingScreen/>
        ) : (
          <div>
            <FullYearCalendar/>
          </div>
        )
      }
    </main>
  );
}
