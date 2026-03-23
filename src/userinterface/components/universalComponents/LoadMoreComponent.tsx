
interface LoadMoreProp{
  totalLenght:number
  visibleCards:number
  handleLoadMore: () => void;
 
}
// interface GameProp {
//   title:string;
//   description:string;
//   img:string

// }
export default function LoadMoreComponent(props:LoadMoreProp) {

  
  const totalItems=props.totalLenght 
  console.log(props.totalLenght)
  const currentItem= props.visibleCards
  console.log(currentItem)
 

  const ProgressComponent: React.FC = () => {
   
    const percentage = (currentItem / totalItems) * 100;
  
    return (
      <div className="w-52 p-4 flex flex-col items-center">
    
        <div className="w-52 bg-gray-200 rounded-full h-[2px]">
          <div
            className={`bg-blue-500 h-[2px] rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
   
        </div>
        <div className="mb-2 text-lg font-semibold text-gray-500">
         <span className='text-[13px]'> Displaying {currentItem} of {totalItems} games</span>
        </div>
      </div>
    );
  };
  
 
  return (
    <div className="flex flex-col items-center w-64 justify-center  ">
      <ProgressComponent  />
  {(     <div className="flex mt-4 space-x-2">
     
       { (currentItem<totalItems &&<button
          onClick={props.handleLoadMore}
          className="bg-[#2f4453] text-white px-4 py-2 rounded hover:bg-[#475e6e] font-bold shadow-lg"
        >
          Load More
        </button>)}
      </div>)}
    </div>
  );
}