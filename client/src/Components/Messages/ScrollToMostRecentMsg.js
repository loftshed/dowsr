import { useRef, useEffect } from "react";

const ScrollToMostRecentMessage = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export default ScrollToMostRecentMessage;
