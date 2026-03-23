
interface Props{
    img?:string;
    w?:string;
    name:string;
  
}

export default function GroupScreenBanner({img,w,name}:Props) {


  return (
    <div className=''>
       <div className={` sm:h-28  h-[6rem] bg-[#1d3947] overflow-hidden  items-center flex justify-around shadow-lg    select-none    `} >
        <span className='font-medium sm:text-[1.8rem] text-[1.4rem] justify-center  items-center text-white select-none'>{name}</span>

        <img src={img} style={{width:w}}  className={` sm:w-60 w-[9rem] opacity-40 `} alt="" />
      </div>
    </div>
  )
}
