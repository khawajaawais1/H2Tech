"use client";
import { useEffect, useState } from "react";

const CountUp = ({ prefix = "", value }: { prefix?: string; value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <>
      {prefix}
      {display}
    </>
  );
};

export default CountUp;
