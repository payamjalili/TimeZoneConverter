import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    tick();

    var id;
    setTimeout(() => {
      tick();
      id = setInterval(tick, delay);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => clearInterval(id);
  }, [delay]);
}
