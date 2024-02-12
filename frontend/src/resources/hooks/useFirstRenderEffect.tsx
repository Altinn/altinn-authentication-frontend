import { useEffect } from 'react';

export const useFirstRenderEffect = (effectFn: () => void) => {
  useEffect(effectFn, []); // eslint-disable-line react-hooks/exhaustive-deps
};
