import TitleCard from "./TitleCard"
import titleImg from "../public/titleImg.svg"
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="absolute overflow-hidden h-full w-full flex items-center justify-center bg-darkCust text-beigeCust">
      <Image
        src={titleImg}
        alt=""
        className="p-12"
        height={400}
        width={400}
        />
    </div>
  )
}

export default LoadingScreen