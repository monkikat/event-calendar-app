import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Image from 'next/image';
import UpcomingEventsList from "./UpcomingEventsList"
import leftIcon from "../public/leftIcon.svg"
import { motion } from "motion/react";

const UpcomingEvents = ({
    isExpanded,
    setIsExpanded, 
} : { 
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>; 
}) => {

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

  return (
    <div className="w-full max-h-[80vh]">
        <motion.div className="cursor-pointer px-8 py-4 font-semibold text-sm flex justify-between xl:text-lg"
        onClick={handleToggle}
        initial={false}
        animate={{
            paddingTop: !isExpanded ? "16px" : "32px",
            paddingBottom: !isExpanded ? "16px" : "32px",
            paddingLeft: !isExpanded ? "32px" : "64px",
            paddingRight: !isExpanded ? "32px" : "32px",
          }}
          transition={{ duration: 0.4 }}
          >
            <p>Upcoming Events</p>
            <Image
                src={leftIcon}
                alt=""
                width={18}
                height={18}
                className={[
                    'transform',
                    'transition-transform',
                    'duration-300',
                    'ease-in-out',
                    isExpanded ? '-rotate-90' : 'rotate-0',
                  ].join(' ')}
             />
        </motion.div>
        {
            isExpanded && (
                <div className="px-4 py-4 pb-12">
                    <UpcomingEventsList/>
                </div>
            )
        }
    </div>
  )
}

export default UpcomingEvents
