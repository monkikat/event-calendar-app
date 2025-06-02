"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import Events from "./Events";
import UpcomingEvents from "./UpcomingEvents";
import { motion, useAnimation } from "motion/react";

const EventLists = ({ selectedDate,
    isDateSelected,
    isListVisible,
    setIsListVisible,
    setIsUpcomingExpanded,
    isUpcomingExpanded
 } : {  selectedDate: string;
        isDateSelected: boolean;
        isListVisible: boolean;
        setIsListVisible: Dispatch<SetStateAction<boolean>>; 
        isUpcomingExpanded: boolean;
        setIsUpcomingExpanded: Dispatch<SetStateAction<boolean>>; 
  }) => {
    
      useEffect(() => {
        if (isDateSelected) {
          setIsUpcomingExpanded(false);
        }
      }, [isDateSelected]);

  return (
    <div className="flex flex-row w-full h-full text-sm bg-darkCust md:flex md:flex-col md:w-full">
        <div className="flex flex-col-reverse justify-start md:flex md:flex-col">
          <motion.div className="border-b-2 border-darkCustLight bg-beigeCust text-xs xl:text-sm"
              initial={{
              y: "-100vw",
              opacity: 0
              }}
              animate={{
              y: 0,
              opacity: 1
              }}
              transition={{
              type: "spring",
              stiffness: 30 ,            
              duration: 0.6,
              delay: 1.2
              }}
          >
              <UpcomingEvents isExpanded={isUpcomingExpanded}
              setIsExpanded = {setIsUpcomingExpanded}/>
          </motion.div>
          {isDateSelected && (
              <div className="z-50 bg-darkCust text-beigeCust text-xs xl:text-sm">
                <Events selectedDate={selectedDate} 
                isExpanded={isUpcomingExpanded}
                setIsExpanded = {setIsUpcomingExpanded}
                isListVisible={isListVisible}
                setIsListVisible = {setIsListVisible}/>
              </div>
          )}
        </div>
    </div>
  )
}

export default EventLists