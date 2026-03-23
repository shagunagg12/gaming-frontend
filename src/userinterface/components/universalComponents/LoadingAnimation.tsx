

interface Props{
  containerClass?:string
  lineClass?:string
  ballClass?:string
}

const LoadingAnimation = ({containerClass ,lineClass,  ballClass}:Props) => {
  return (
    <div className={`${containerClass} loading-container `}>
    <div className={`${lineClass} line`}>
      <div className={`${ballClass} ball`}></div>
    </div>
  </div>
  );
};

export default LoadingAnimation;
