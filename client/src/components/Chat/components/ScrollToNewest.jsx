import { useRef, useEffect } from "react";

const ScrollToNewest = () => {
  // Used to scroll to the most recent message when a thread is rendered
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export default ScrollToNewest;
