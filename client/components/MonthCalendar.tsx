import { CalendarMonth } from '@/types';
import { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import leftIcon from '../public/leftIcon.svg'
import EventLists from './EventLists';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthCalendar = ({
    calendarData,
    onDateSelect,
    selectedDate,
    onBack
} : {
    calendarData: CalendarMonth | null;
    onDateSelect: (date: string) => void;
    selectedDate: string;
    onBack: MouseEventHandler<HTMLImageElement> | undefined;
}) => {

  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [ isListVisible, setIsListVisible ] = useState<boolean>(true);
  const currentDate = new Date().toISOString().split("T")[0];

  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState<boolean>(true);

  return (
    <div className="flex flex-col h-full min-h-[60vh] w-screen justify-between text-sm bg-beigeCust overflow-x-hidden overflow-y-auto lg:flex lg:flex-row lg:overflow-y-hidden">
      <div className="w-full flex justify-between items-center border-r-2 border-r-darkCustLight">
        <div className='h-full flex py-12 px-4 hover:cursor-pointer'>
          <Image
            src={leftIcon}
            alt="Back"
            width={24}
            height={24}
            className="inline-block"
            onClick={onBack}
          />
        </div>
        <div className='w-full text-[14px] flex flex-col px-18 py-28 gap-y-8 lg:gap-y-12 lg:py-0'>
          <h2 className='font-semibold text-3xl text-center'>
            {calendarData?.name}
          </h2>
          <div className="grid grid-cols-7 text-center text-md font-semibold gap-x-8 lg:gap-x-12">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-darkCustLight text-lg p-4">{day}</div>
            ))}

            {Array(calendarData?.days[0].dayOfWeek).fill(null).map((_, idx) => (
              <div key={`empty-${idx}`}></div>
            ))}

            {calendarData?.days.map((day) => (
              <div key={day.fullDate}
              className={`px-8 py-4 hover:cursor-pointer hover:text-amber-500 ${day.fullDate === selectedDate ? 'text-amber-500' : ''}  ${day.fullDate === currentDate ? 'bg-amber-500 rounded-full p-1 text-darkCust hover:text-darkCust' : ''}`}
              onClick={()=> {
                onDateSelect(day.fullDate);
                setIsDateSelected(true);
                setIsListVisible(true);
              }}>
                {day.date}
              </div>
            ))}
          </div>
        </div>
      </div>

      <EventLists selectedDate={selectedDate} 
        isDateSelected={isDateSelected}
        isListVisible={isListVisible}
        setIsListVisible={setIsListVisible}
        isUpcomingExpanded={isUpcomingExpanded}
        setIsUpcomingExpanded={setIsUpcomingExpanded}/>
    </div>
  )
}

export default MonthCalendar
