import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { OverviewPage } from '@/features/overviewpage/OverviewPage';
import { CreationPage } from '@/features/creationpage/CreationPage';
import { NotFoundSite } from '@/sites/NotFoundSite';
import { DetailPage } from '@/features/detailpage/DetailPage';
import { AuthenticationRoute } from '../paths';
import { VendorRequestPage } from '@/features/vendorRequestPage';
import { ChangeRequestPage } from '@/features/changeRequestPage';

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
        path={`${AuthenticationRoute.Details}/:id`}
        element={<DetailPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={`${AuthenticationRoute.VendorRequest}`}
        element={<VendorRequestPage />}
        errorElement={<NotFoundSite />}
      />
      <Route
        path={`${AuthenticationRoute.ChangeRequest}`}
        element={<ChangeRequestPage />}
        errorElement={<NotFoundSite />}
      />
    </Route>,
  ),
  { basename: '/authfront/ui' },
);
