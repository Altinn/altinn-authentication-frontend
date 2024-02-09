import { useEffect, useRef } from 'react';

export const useFirstRenderEffect = (effectFn: () => void) => {
  const isFirstRender = useRef<boolean>(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      effectFn();
    }
  }, [effectFn]);
};
