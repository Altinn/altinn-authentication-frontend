import { Panel } from '@altinn/altinn-design-system';
import { Button, Spinner } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { ReactComponent as Edit } from '@/assets/Edit.svg';
import { ReactComponent as Error } from '@/assets/Error.svg';
import { resetDelegationRequests } from '@/rtk/features/apiDelegation/delegationRequest/delegationRequestSlice';
import { resetDelegableOrgs } from '@/rtk/features/apiDelegation/delegableOrg/delegableOrgSlice';
import {
  fetchOverviewOrgsOffered,
  fetchOverviewOrgsReceived,
  restoreAllSoftDeletedItems,
  softDeleteAll,
  softRestoreAll,
  deleteOfferedApiDelegation,
  deleteReceivedApiDelegation,
  type OverviewOrg,
  type DeletionRequest,
} from '@/rtk/features/apiDelegation/overviewOrg/overviewOrgSlice';
import { resetDelegableApis } from '@/rtk/features/apiDelegation/delegableApi/delegableApiSlice';
import { useMediaQuery } from '@/resources/hooks';
import { ApiDelegationPath } from '@/routes/paths';

import { LayoutState } from '../LayoutState';

import { OrgDelegationActionBar } from './OrgDelegationActionBar';
import classes from './OverviewPageContent.module.css';

import { ErrorPanel, CollectionBar, ActionBar } from '@/components';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { SingleRightPath } from '@/routes/paths'; // temporary, from ChooseServicePage

// NOTE! this version of OverviewPageContent is for CreationPage


export interface OverviewPageContentInterface {
  layout: LayoutState;
}

// I think layout is set to .Offered, as initial/default of (arrow) function component,
// there is only one version of OverviewPagecontent.tsx, 
// but when parent OverviewPage component
// creates child <OverviewPageContent>  layout is passed in as a prop
// <OverviewPageContent layout={LayoutState.Offered} /> 
// while in OverviewPage for received
// <OverviewPageContent layout={LayoutState.Received} />

export const OverviewPageContent = ({
  layout = LayoutState.Offered,
}: OverviewPageContentInterface) => {
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const overviewOrgs = useAppSelector((state) => state.overviewOrg.overviewOrgs);
  const error = useAppSelector((state) => state.overviewOrg.error);
  const loading = useAppSelector((state) => state.overviewOrg.loading);
  const isSm = useMediaQuery('(max-width: 768px)');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fetchData: () => any;
  let overviewText: string;
  let accessesHeader: string;
  let noDelegationsInfoText: string;

  useEffect(() => {
    if (loading) {
      void fetchData();
    }
    handleSaveDisabled();
    dispatch(resetDelegableApis());
    dispatch(resetDelegableOrgs());
    dispatch(resetDelegationRequests());
  }, [overviewOrgs, error]);

  // layout is set to .Offered above: .Received not really used in this page I believe
  // odd duplication of OverviewPages with dual purpose... but OK
  // where is layout used? Here it only set String texts...
  switch (layout) {
    case LayoutState.Offered:
      fetchData = async () => await dispatch(fetchOverviewOrgsOffered());
      overviewText = t('authentication_dummy.auth_overview_text_creation'); // h2 below, not in Small/mobile view
      accessesHeader = t('api_delegation.you_have_delegated_accesses');
      noDelegationsInfoText = t('api_delegation.no_offered_delegations');
      break;
    case LayoutState.Received:
      fetchData = async () => await dispatch(fetchOverviewOrgsReceived());
      overviewText = t('api_delegation.api_received_overview_text');
      accessesHeader = t('api_delegation.you_have_received_accesses');
      noDelegationsInfoText = t('api_delegation.no_received_delegations');
      break;
  }

  const goToStartDelegation = () => {
    dispatch(restoreAllSoftDeletedItems());
    navigate('/' + ApiDelegationPath.OfferedApiDelegations + '/' + ApiDelegationPath.ChooseOrg);
  };

  const handleSaveDisabled = () => {
    for (const org of overviewOrgs) {
      if (org.isAllSoftDeleted) {
        setSaveDisabled(false);
        return;
      }
      for (const api of org.apiList) {
        if (api.isSoftDelete) {
          setSaveDisabled(false);
          return;
        }
      }
    }
    setSaveDisabled(true);
  };

  

  const mapToDeletionRequest = (orgNr: string, apiId: string) => {
    const deletionRequest: DeletionRequest = {
      orgNr,
      apiId,
    };
    return deletionRequest;
  };

  const handleSave = () => {
    for (const org of overviewOrgs) {
      for (const item of org.apiList) {
        if (item.isSoftDelete) {
          if (layout === LayoutState.Offered) {
            void dispatch(deleteOfferedApiDelegation(mapToDeletionRequest(org.orgNr, item.id)));
          } else if (layout === LayoutState.Received) {
            void dispatch(deleteReceivedApiDelegation(mapToDeletionRequest(org.orgNr, item.id)));
          }
        }
      }
    }
    setIsEditable(false);
  };

  

  



  return (
    <div className={classes.overviewActionBarContainer}>

      {!isSm && <h2 className={classes.pageContentText}>{overviewText}</h2>}
      
      <div>
        <br></br>
      </div>

      <table>
        <tr>
          <td>
            
            <p>Navn</p> 
            <p>XXXXX INPUT BOKS XXXXX</p> 
            <br></br>
            <p>Beskrivelse</p> 
            <p>XXXXX INPUT BOKS XXXXX</p>    

            <p> </p> 

           
            <div>
              <br></br><br></br><br></br>
              <br></br><br></br><br></br>
              <br></br><br></br><br></br>
              <br></br><br></br><br></br>
              <br></br><br></br>
              
            </div>
          
            <p>____________________________________________ </p> 
          
          </td>

          <td>
            <p>
              En systembruker kan i utgangspunktet kun benyttes av Pølsebu AS sine 
              egne maskinporten-klienter. 
              <a href="https://altinn.github.io/docs/"> Les mer her</a> og  
              <a href="https://docs.altinn.studio/nb/"> her</a>. 
            </p>
            <p>
              Ved å velge en systemleverandør vil opprettet systembruker kunne 
              benyttes fra leverandørens system. Leverandørens system vil da ha 
              fullmaktene tildelt til systembrukeren.
            </p>
            <br></br>

            <p>Velg systemleverandør</p>
            <p>NEDTREKKSMENY</p>
            <p>Microsoft Norge PowerBI</p>
            <p>Visma SuperTax</p>
            <p>Aqua Nor Aqua Master</p>
            <p>Fiken Business Power</p>
            <p>PostNord Strålboks</p>

            <br></br><br></br>

            <p> AVBRYT-KNAPP _____  OPPRETT-KNAPP</p>

          </td>
        </tr>
      </table>

      


    </div>
  );
};
