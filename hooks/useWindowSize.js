import { useState, useEffect } from "react";
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export const useResponsive = () => {
  const [isMobile, setMobile] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    function handleResponsive() {
      if (width < 600) {
        setMobile(() => true);
      } else {
        setMobile(() => false);
      }
    }

    handleResponsive();
  }, [width]); // Empty array ensures that effect is only run on mount

  return isMobile;
};

export const useResponsiveTab = () => {
  const [isTab, setTab] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    function handleResponsive() {
      if (width < 800) {
        setTab(() => true);
      } else {
        setTab(() => false);
      }
    }

    handleResponsive();
  }, [width]); // Empty array ensures that effect is only run on mount

  return isTab;
};

export default useWindowSize;
