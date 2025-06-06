"use client"

import { CalendarMonth } from "@/types";
import { useEffect, useState } from "react"
import { motion, useAnimation } from "motion/react";
import EventLists from "./EventLists";
import titleImg from "../public/titleImg.svg"
import Image from 'next/image';

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const YearCalendar = ({ 
  calendarData,
  onDateSelect,
  selectedDate,
  onMonthSelect,
} : 
{ 
  calendarData: CalendarMonth[];
  onDateSelect: (date: string) => void;
  selectedDate: string;
  onMonthSelect: (selectedMonth: number) => void;
}) => {

  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [ isListVisible, setIsListVisible ] = useState<boolean>(true);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState<boolean>(true);

  const currentDate = new Date().toISOString().split("T")[0];

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
    <div className="overflow-auto flex flex-col w-full h-full justify-between text-xs lg:flex lg:flex-row lg:overflow-hidden lg:h-screen sm:text-sm">
        <motion.div className="flex z-50 shrink-0 w-full justify-center items-center border-r-2 border-darkCustLight bg-beigeCust lg:w-2/3 lg:h-full"
          initial={{
            x: "-100vw"
          }}
          animate={{
            x: 0
          }}
          transition={{
            type: "spring",
            stiffness: 30 ,
            duration: 1,
            delay: 0.2
          }}>
          <div className="p-12 w-fit h-fit text-xs xl:text-sm">
            <div className="grid grid-cols-3 gap-1 p-2 text-textDark xl:gap-4 md:grid-cols-4">
              {calendarData.map((month) => (
                <div key={month.name} className="p-2 transition-transform duration-300 hover:scale-105">
                  <h2 className="font-semibold text-xs pb-2 hover:cursor-pointer md:text-sm"
                  onClick={() => {
                    onMonthSelect(month.index);
                  }}
                  >{month.name}</h2>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {WEEKDAYS.map((day) => (
                      <div key={day} className="text-darkCustLight">{day}</div>
                    ))}

                    {Array(month.days[0].dayOfWeek).fill(null).map((_, idx) => (
                      <div key={`empty-${idx}`}></div>
                    ))}

                    {month.days.map((day) => (
                      <div key={day.fullDate}
                      onClick={() => {
                        onDateSelect(day.fullDate);
                        setIsDateSelected(true);
                        setIsListVisible(true);
                        setIsUpcomingExpanded(false);
                      }}
                      className={`hover:cursor-pointer hover:text-amber-500 ${day.fullDate === selectedDate ? 'text-amber-500' : ''} ${day.fullDate === currentDate ? 'bg-amber-500 rounded-full px-1 text-darkCust hover:text-darkCust' : ''}`}>
                        {day.date}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div> 
        
        <EventLists selectedDate={selectedDate} 
        isDateSelected={isDateSelected}
        isListVisible={isListVisible}
        setIsListVisible={setIsListVisible}
        setIsUpcomingExpanded={setIsUpcomingExpanded}
        isUpcomingExpanded={isUpcomingExpanded}/>


        <motion.div
                    initial={{ bottom: "50%", right: "50%", translateX: "50%", translateY: "50%"}}
                    animate={controls}
                    className="absolute"
                >
            <Image
            src={titleImg}
            alt=""
            className="p-12"
            height={400}
            width={400}
            />
        </motion.div>
      </div>
  )
}

export default YearCalendar
