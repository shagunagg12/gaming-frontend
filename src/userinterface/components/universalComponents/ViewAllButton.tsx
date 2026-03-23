import { Link } from "react-router-dom";


interface Props {
name:string;
total:number;
link:string;
    
}

function ViewAllButton(props:Props) {
  return (
 <>
 <Link to={`/casino/group/${props.link}`}> 
    <button className="bg-[#3b6362] shadow-[#252323] shadow-md hover:bg-[#466f75] text-sm text-white font-bold text-center px-4  h-10 rounded-[4px]  m-6">
            View All   {props.total}{props.name}
  </button>
  </Link>
 </>
  )
}

export default ViewAllButton
