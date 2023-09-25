import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import * as React from 'react';

import { OverviewPage as AuthenticationOverviewPage } from '@/features/overviewpage/OverviewPage';
import { CreationPage } from '@/features/creationpage/CreationPage';
import { DirectConsentPage } from '@/features/directconsentpage/DirectConsentPage';

import { ChooseApiPage } from '@/features/apiDelegation/offered/ChooseApiPage';
import { OverviewPage as OfferedOverviewPage } from '@/features/apiDelegation/offered/OverviewPage';
import { OverviewPage as ReceivedOverviewPage } from '@/features/apiDelegation/received/OverviewPage';
import { ChooseOrgPage } from '@/features/apiDelegation/offered/ChooseOrgPage';
import { ReceiptPage } from '@/features/apiDelegation/offered/ReceiptPage';
import { ConfirmationPage } from '@/features/apiDelegation/offered/ConfirmationPage';
import { ChooseServicePage } from '@/features/singleRight/delegate/ChooseServicePage/ChooseServicePage';
import { ChooseRightsPage } from '@/features/singleRight/delegate/ChooseRightsPage/ChooseRightsPage';

import { NotFoundSite } from '@/sites/NotFoundSite';

import { GeneralPath, AuthenticationPath, SingleRightPath, ApiDelegationPath } from '../paths';

// Note: there are just 8 pages: the elaborate and repetitive route tree below
// maps out URLs such as /Basepath/OfferedApiDelegations/Overview
// e.g. /accessmanagement/ui
// + /offered-api-delegations
// + /overview
// = /accessmanagement/ui/offered-api-delegations/overview/

// All these 8 pages are available through Router, despite error messages.

// In summary, the 5 paths in OfferedApiDelegations branch are:
// /accessmanagement/ui/offered-api-delegations/overview/
// /accessmanagement/ui/offered-api-delegations/choose-org/
// /accessmanagement/ui/offered-api-delegations/choose-api/
// /accessmanagement/ui/offered-api-delegations/receipt/
// /accessmanagement/ui/offered-api-delegations/confirmation/

// ReceivedApiDelegations only has 1 branch: 
// /accessmanagement/ui/received-api-delegations/overview/

// Finally, SingleRightPath has 2 branches:
// /accessmanagement/ui/delegate-single-rights/choose-service/
// /accessmanagement/ui/delegate-single-rights/choose-rights/

// with the new BasePath = "/authfront/ui" our Overview page will be at:
// http://localhost:5173/authfront/ui/offered-api-delegations/overview

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
        
      </Route>




      <Route
        path={ApiDelegationPath.OfferedApiDelegations}
        errorElement={<NotFoundSite />}
      >
        <Route
          path={ApiDelegationPath.Overview}
          element={<OfferedOverviewPage />}
          errorElement={<NotFoundSite />}
        />
        <Route
          path={ApiDelegationPath.ChooseOrg}
          element={<ChooseOrgPage />}
          errorElement={<NotFoundSite />}
        />
        <Route
          path={ApiDelegationPath.ChooseApi}
          element={<ChooseApiPage />}
          errorElement={<NotFoundSite />}
        />
        <Route
          path={ApiDelegationPath.Confirmation}
          element={<ConfirmationPage />}
          errorElement={<NotFoundSite />}
        />
        <Route
          path={ApiDelegationPath.Receipt}
          element={<ReceiptPage />}
          errorElement={<NotFoundSite />}
        />
      </Route>

      <Route
        path={ApiDelegationPath.ReceivedApiDelegations}
        errorElement={<NotFoundSite />}
      >
        <Route
          path={ApiDelegationPath.Overview}
          element={<ReceivedOverviewPage />}
          errorElement={<NotFoundSite />}
        />
      </Route>

      <Route
        path={SingleRightPath.DelegateSingleRights}
        errorElement={<NotFoundSite />}
      >
        <Route
          path={SingleRightPath.ChooseService}
          element={<ChooseServicePage />}
          errorElement={<NotFoundSite />}
        />
        <Route
          path={SingleRightPath.ChooseRights}
          element={<ChooseRightsPage />}
          errorElement={<NotFoundSite />}
        />
      </Route>

    </Route>,
  ),
  { basename: GeneralPath.BasePath },
);
