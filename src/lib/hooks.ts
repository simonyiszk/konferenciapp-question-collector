import React, { useEffect, useState } from 'react';

export function useInterval(callback: Function, delay: number | null = null) {
  const savedCallback = React.useRef<typeof callback>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        savedCallback.current!();
      }, delay);
      return () => clearInterval(id);
    } else return () => {};
  }, [delay]);
}

export function useTime(update = true) {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), update ? 1000 : null);
  return now;
}

export function useSSR() {
  const [ssr, setSSR] = useState(true);
  useEffect(() => setSSR(false), []);

  return ssr;
}
