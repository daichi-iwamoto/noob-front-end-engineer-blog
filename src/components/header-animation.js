import React, { useRef, useEffect, useState, useCallback } from "react";
import mojs from "@mojs/core";

/**
 * Usage:
 * import MojsExample from './MojsExample';
 *
 * <MojsExample duration={1000}/>
 */

const MojsExample = ({ duration }) => {
  const animDom = useRef();

  useEffect(() => {
    if (animDom.current) return;

    animDom.current = new mojs.Shape({
      parent: animDom.current,
      shape: "circle",
      fill: { "#FC46AD": "#F64040" },
      radius: { 50: 200 },
      duration: 1000,
      isShowStart: true,
      easing: "elastic.inout",
    });
  });

  const clickHandler = useCallback(() => {
    animDom.current.play();
  });

  return (
    <div>
      <div ref={animDom}>aa</div>
    </div>
  );
};

export default MojsExample;