import React, { useEffect, useRef } from "react";

import useWindowSize from "../../hooks/useWindowSize";

// import Footer from "../../layout/components/Footer";

const SmoothScroll = ({ children }) => {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef();

  // 3.
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // 4.
  useEffect(() => {
    setTimeout(
      function () {
        setBodyHeight();
      }.bind(this),
      100
    );
    setBodyHeight();
  }, [windowSize.height, children]);

  const setBodyHeight = () => {
    // console.log(FooterRef.current.firstChild.getBoundingClientRect());
    document.body.style.height = `${
      scrollingContainerRef.current.getBoundingClientRect().height
    }px`;
  };

  // 5.
  useEffect(() => {
    windowSize.width > 500
      ? requestAnimationFrame(() => smoothScrollingHandler())
      : null;
  }, [windowSize, children]);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current
      ? (scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`)
      : null;

    setBodyHeight();

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className="scroll-parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
