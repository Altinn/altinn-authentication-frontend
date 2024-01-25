import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const getMatches = (match: string): boolean => window?.matchMedia(match).matches ?? false;

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const eventListener = () => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    eventListener();
    matchMedia.addEventListener('change', eventListener);
    return () => {
      matchMedia.removeEventListener('change', eventListener);
    };
  }, [query]);

  return matches;
};
