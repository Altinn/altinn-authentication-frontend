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
import { ErrorPanel } from '@/components';

import { LayoutState } from '../LayoutState';

import { OrgDelegationActionBar } from './OrgDelegationActionBar';
import classes from './OverviewPageContent.module.css';

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
      overviewText = t('authentication_dummy.auth_overview_text_administrere'); // h2 below, not in Small/mobile view
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

  const handleSetIsEditable = () => {
    if (isEditable) {
      dispatch(restoreAllSoftDeletedItems());
    }
    setIsEditable(!isEditable);
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

  const activeDelegations = () => {
    if (error.message) {
      return (
        <div className={classes.errorPanel}>
          <ErrorPanel
            title={t('api_delegation.data_retrieval_failed')}
            message={error.message}
            statusCode={error.statusCode}
          ></ErrorPanel>
        </div>
      );
    } else if (loading) {
      return (
        <div className={classes.spinnerContainer}>
          <Spinner
            title={String(t('common.loading'))}
            size='large'
          />
        </div>
      );
    } else if (overviewOrgs.length < 1) {
      return <h3 className={classes.noActiveDelegations}>{noDelegationsInfoText}</h3>;
    }
    return overviewOrgs.map((org: OverviewOrg) => (
      <div
        key={org.id}
        className={classes.actionBarWrapper}
      >
        <OrgDelegationActionBar
          organization={org}
          isEditable={isEditable}
          softDeleteAllCallback={() => dispatch(softDeleteAll(org.id))}
          softRestoreAllCallback={() => dispatch(softRestoreAll(org.id))}
          key={org.id}
        ></OrgDelegationActionBar>
      </div>
    ));
  };

  return (
    <div className={classes.overviewActionBarContainer}>
      
      {!isSm && <h2 className={classes.pageContentText}>{overviewText}</h2>}
      
      {layout === LayoutState.Offered && (
        <div className={classes.delegateNewButton}>
          <Button
            variant='outline'
            onClick={goToStartDelegation}
            icon={<Add />}
            fullWidth={isSm}
            size='medium'
          >
            {t('authentication_dummy.auth_new_system_user_opprett')}
          </Button>
        </div>
      )}

      <Panel
        title={t('authentication_dummy.auth_card_title_tidligere_opprettet')}
        forceMobileLayout={isSm}
        showIcon={!isSm}
      >
        {t('api_delegation.api_panel_content')}{' '}
        <a
          className={classes.link}
          href='https://github.com/Altinn/altinn-authentication-frontend/issues/2'
          target='_blank'
          rel='noreferrer'
        >
          {'(se Runes issue #2) XXXX'}
        </a>
      </Panel>

      <div className={classes.explanatoryContainer}>
        {overviewOrgs.length > 0 && (
          <>
            {isSm ? (
              <h3 className={classes.apiSubheading}>{accessesHeader}</h3>
            ) : (
              <h2 className={classes.apiSubheading}>{accessesHeader}</h2>
            )}
            <div className={classes.editButton}>
              {!isEditable ? (
                <Button
                  variant='quiet'
                  icon={<Edit />}
                  onClick={handleSetIsEditable}
                  size='small'
                >
                  {t('api_delegation.edit_accesses')}
                </Button>
              ) : (
                <Button
                  variant='quiet'
                  icon={<Error />}
                  onClick={handleSetIsEditable}
                  size='small'
                >
                  {t('common.cancel')}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <>{activeDelegations()}</>
      {isEditable && (
        <div className={classes.saveSection}>
          <Button
            disabled={saveDisabled}
            onClick={handleSave}
            color='success'
            fullWidth={isSm}
          >
            {t('api_delegation.save')}
          </Button>
        </div>
      )}
    </div>
  );
};
