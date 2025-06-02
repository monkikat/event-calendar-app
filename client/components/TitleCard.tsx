import titleImg from "../public/titleImg.svg"
import Image from 'next/image';


const TitleCard = () => {
  return (
    <div className="h-fit p-8">
        <Image
        src={titleImg}
        alt=""
        className=""
        />
    </div>
  )
}

export default TitleCard