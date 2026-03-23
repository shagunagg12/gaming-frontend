import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children, containerRef }: { children: React.ReactNode; containerRef: React.RefObject<HTMLDivElement> }) {
  const location = useLocation();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
      
      });
    }
  }, [location, containerRef]);

  return <>{children}</>;
}

export default ScrollToTop;
