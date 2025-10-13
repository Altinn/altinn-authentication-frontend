import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const getNewUiUrl = (): string => {
  const host = window.location.hostname.replace('authn.ui.', 'am.ui.');
  return `https://${host}/accessmanagement/ui/systemuser/overview`;
};

const NewPageAlert = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          maxWidth: '35rem',
        }}
      >
        Systemtilgang-sidene er flyttet til en ny url, vennligst gå til{' '}
        <a href={getNewUiUrl()} target='_blank' rel='noreferrer'>
          {getNewUiUrl()}
        </a>
      </div>
    </div>
  );
};

export const Router = createBrowserRouter(
  createRoutesFromElements(<Route path='*' element={<NewPageAlert />}></Route>),
  { basename: '/authfront/ui' },
);
