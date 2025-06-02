"use client";

import { YearCalendar, Location } from "@/components";
import { useEffect, useMemo, useState } from "react";
import MonthCalendar from "./MonthCalendar";
import { CalendarMonth, Day } from "@/types";
import Footer from "./Footer";

/*

        <div className="w-1/4">
          <Location selectedDate={selectedDate}/>
        </div>
 */



function generateMonthCalendarData(year: number, month: number): CalendarMonth {
  const date = new Date(year, month, 1);
  const monthName = date.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Day[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      days.push({
          date: day,
          dayOfWeek: fullDate.getDay(),
          fullDate: fullDate.toISOString().split("T")[0], 
      });
  }

  return { name: monthName, index: month, days };
}

function generateYearCalendarData(year: number): CalendarMonth[] {
  const months: CalendarMonth[] = [];

  for (let month = 0; month < 12; month++) {
      const monthData = generateMonthCalendarData(year, month);
      months.push(monthData);
  }

  return months
} 


const FullYearCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const yearData = useMemo(() => generateYearCalendarData(selectedYear), [selectedYear]);
  const monthData = useMemo(() => {
    if (selectedMonth === null) return null;
    return generateMonthCalendarData(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  const handleMonthSelect = (monthIndex: number) => {
    const monthName = yearData[monthIndex].name;
    setSelectedMonth(monthIndex);
  };

  return (
    <div className='flex flex-col items-center w-screen h-full bg-darkCust'>
      {
        selectedMonth === null ? (
          <YearCalendar
          calendarData={yearData} 
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
          onMonthSelect={handleMonthSelect}/>
        ) : (
          <MonthCalendar
            calendarData={monthData}
            monthIndex={selectedMonth}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
            onBack={() => setSelectedMonth(null)}/>
        )
      }
    </div>
  )
}

export default FullYearCalendar
