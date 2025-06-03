import Location from "./Location"
import Image from 'next/image';

import crossIcon from "../public/crossIcon.svg";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "motion/react";

const Events = ({selectedDate,
  isExpanded,
  isListVisible,
  setIsListVisible, 
} : {selectedDate: string;
  isExpanded: boolean;
  isListVisible: boolean;
  setIsListVisible: Dispatch<SetStateAction<boolean>>; 
}) => {

  useEffect(() => {
    if (isExpanded) {
      setIsListVisible(false)
    }
  }, [isExpanded, setIsListVisible]);
  
  return (
    <div>
      {
        isListVisible && (
          <motion.div className="h-full w-full overflow-y-auto"
          >
            <motion.div className="font-semibold w-full text-sm flex justify-between xl:text-lg"
              initial={false}
              animate={{
                  paddingTop: isExpanded ? "16px" : "32px",
                  paddingBottom: isExpanded ? "16px" : "32px",
                  paddingLeft: isExpanded ? "32px" : "64px",
                  paddingRight: isExpanded ? "32px" : "32px",
                }}
                transition={{ duration: 0.4 }}>
                <div className="">Events for {
                                                (() => {
                                                  // Parse the date parts directly from the string to avoid timezone issues
                                                  const [year, month, day] = selectedDate.split('-').map(Number);
                                                  // Create a date object with the local timezone
                                                  const date = new Date(year, month - 1, day);
                                                  return date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                  });
                                                })()
                                              }:</div>
                <Image
                    src={crossIcon}
                    alt=""
                    width={18}
                    height={18}
                    className="hover:cursor-pointer"
                    onClick={() => setIsListVisible(false)}
                  />
            </motion.div>
            {
              !isExpanded && (
                <div className="h-fit pt-4 max-h-[60vh] rounded-lg overflow-y-auto hide-scrollbar">
                    <Location selectedDate={selectedDate}/>
                </div>
              )
            }
          </motion.div>
        )
      }
    </div>
  )
}

export default Events
