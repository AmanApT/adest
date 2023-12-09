import Image from "next/image"
import convertimage from '@/assets/convertimage.jpeg'

interface EachconvertcardProp{
    title: String,
    description: String,
    img: String
}

const Eachconvertcard: React.FC<EachconvertcardProp> = ({title,description,img}) => {
  return (
    <div className="each-convert-card">
        {/* <p className="card-img" >📃</p> */}
        <Image alt="png" src={convertimage}/> 
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
    </div>
  )
}

export default Eachconvertcard