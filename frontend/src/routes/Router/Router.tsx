import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { OverviewPage } from '@/features/overviewpage/OverviewPage';
import { CreationPage } from '@/features/creationpage/CreationPage';
import { MaskinportenAdmPage } from '@/features/maskinportenAdm/MaskinportenAdmPage';
import { NotFoundSite } from '@/sites/NotFoundSite';
import { RightsIncludedPage } from '@/features/rightsincludedpage';
import { DetailPage } from '@/features/detailpage/DetailPage';
import { AuthenticationRoute } from '../paths';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<NotFoundSite />}>
      <Route
        path={AuthenticationRoute.Overview}
        element={<OverviewPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={AuthenticationRoute.Creation}
        element={<CreationPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={AuthenticationRoute.RightsIncluded}
        element={<RightsIncludedPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={AuthenticationRoute.MaskinportenAdm}
        element={<MaskinportenAdmPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={`${AuthenticationRoute.Details}/:id`}
        element={<DetailPage />}
        errorElement={<NotFoundSite />}
      />
    </Route>,
  ),
  { basename: '/authfront/ui' },
);
