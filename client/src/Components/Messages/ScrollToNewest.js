import { useRef, useEffect } from "react";

const ScrollToNewest = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "auto" }));
  return <div ref={elementRef} />;
};

export default ScrollToNewest;
