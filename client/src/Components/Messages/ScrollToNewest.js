import { useRef, useEffect } from "react";

const ScrollToNewest = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export default ScrollToNewest;
