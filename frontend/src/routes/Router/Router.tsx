import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import * as React from 'react';

import { OverviewPage as AuthenticationOverviewPage } from '@/features/overviewpage/OverviewPage';
import { CreationPage } from '@/features/creationpage/CreationPage';
import { DirectConsentPage } from '@/features/directconsentpage/DirectConsentPage';
import { MaskinportenIntAdmPage } from '@/features/maskinportenIntAdm/MaskinportenIntAdmPage';

import { NotFoundSite } from '@/sites/NotFoundSite';
import { GeneralPath, AuthenticationPath } from '../paths';


export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      errorElement={<NotFoundSite />}
    >
      
      <Route
        path={AuthenticationPath.Auth}
        errorElement={<NotFoundSite />}
      >
        <Route
          path={AuthenticationPath.Overview}
          element={<AuthenticationOverviewPage />}
          errorElement={<NotFoundSite />}
        />

        <Route
          path={AuthenticationPath.Creation}
          element={<CreationPage />}
          errorElement={<NotFoundSite />}
        />

        <Route
          path={AuthenticationPath.DirectConsent}
          element={<DirectConsentPage />}
          errorElement={<NotFoundSite />}
        />

        <Route
          path={AuthenticationPath.MaskinportenAdm}
          element={<MaskinportenIntAdmPage />}
          errorElement={<NotFoundSite />}
        />
        
      </Route>
    </Route>,
  ),
  { basename: GeneralPath.BasePath },
);
