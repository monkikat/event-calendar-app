import { motion } from "motion/react"

const YearCard = () => {
  return (
    <motion.div className="absolute bottom-0 font-semibold text-xl bg-beigeCust flex flex-col w-[62vw] py-2 px-4 overflow-hidden justify-center items-end border-t-2 border-t-darkCustLight"
    initial={{
        x: "-100vw"
      }}
      whileHover={{ x: 27,
        transition: {
            delay: 0
        }
       }}
      animate={{
        x: 0
      }}
      transition={{
        type: "spring",
        stiffness: 30 ,
        duration: 1,
        delay: 1.2
      }}>
        <p>2025</p>
    </motion.div>
  )
}

export default YearCard