import { MouseEventHandler } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import TooltipComponent from "./ToolTipComponent";
import { createPortal } from "react-dom";



interface item{
  link:string;
  icon:IconType;
  title:string;

}
interface Props{
  item:item;
  handleMouseEnter:MouseEventHandler;
  handleMouseLeave:MouseEventHandler;
}
// Reusable Link Component with Tooltip
 const SidebarLink = ({ item, handleMouseEnter, handleMouseLeave }:Props) => (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='relative flex group'>
     <TooltipComponent trianglePosition="left-1/3" tooltipText={item.title}>

     
       <Link to={`/${item.link}`} className={`p-4 rounded-[4px] flex relative hover:bg-[#22524e] hover:text-white text-[#769191]`}>
       <item.icon className='hover:text-white group' size={22} />
      </Link>
      </TooltipComponent>
      {/* <div className={`whitespace-nowrap left-3 absolute bg-white p-2 text-black font-semibold text-[13px] px-3 -top-[45px] rounded-md hidden -translate-x-3 group-hover:block`}>
        {item.title}
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-b-0 border-l-transparent border-r-transparent absolute -bottom-[6px] left-4 z-50" />
      </div> */}

    </div>
  );

  export {SidebarLink};
