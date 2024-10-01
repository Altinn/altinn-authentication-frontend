import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirstRenderEffect } from '@/resources/hooks';

export const RedirectPage = (): React.ReactNode => {
  const { redirectUrl } = useParams();
  useFirstRenderEffect(() => {
    if (redirectUrl) {
      const decodedUrl = decodeURIComponent(redirectUrl);
      window.location.assign(decodedUrl);
    }
  });
  return <div>Videresender...</div>;
};
