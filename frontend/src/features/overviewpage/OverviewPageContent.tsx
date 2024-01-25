import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationPath } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { InnerCollectionBar, OuterCollectionBar } from '@/components';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button, Heading, Tag } from '@digdir/design-system-react';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';

export const OverviewPageContent = () => {
  // Fix-me: CollectionBar links go nowhere yet

  const dispatch = useAppDispatch();
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);
  const postConfirmed = useAppSelector((state) => state.creationPage.postConfirmed);

  useEffect(() => {
    // If user reverts to OverviewPage after New SystemUser creation,
    // using BrowserBackButton,
    // we need to reset postConfirmed and do fetchOverviewPage here
    if (postConfirmed) {
      void dispatch(resetPostConfirmation());
      void dispatch(fetchOverviewPage());
    }
  }, [reduxObjektArray, postConfirmed]);

  const { t } = useTranslation('common'); // not used yet
  const navigate = useNavigate();

  const rightsObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );
  const compact: boolean = false; // not used yet

  // INNERMOST LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  // mock array for ActionTags such as Read, Write, Sign etc:
  // *********API not ready************
  // but should be flexible for future new actions, such as Rune´s Launch-Rocket
  const mockRightsActionsArray = [
    { name: 'Lese', on: true },
    { name: 'Skrive', on: false },
    { name: 'Signere', on: true },
    { name: 'Les arkiv', on: false },
    { name: 'Launch-Rune´s-Rocket', on: true },
  ];

  // The Tags are mapped out of the mockRightsActionsArray
  const onlyTags = mockRightsActionsArray.map((mockRightsActions, index) => (
    <div key={index} className={classes.tagSeparator}>
      <Tag size='small' color={mockRightsActions.on ? 'info' : 'danger'}>
        {mockRightsActions.name}
      </Tag>
    </div>
  ));

  // MIDDLE LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  // consumes Tag-array as collection
  // uses custom CollectionBar InnerCollectionBar
  // Fix-me: colors very restricted via base "class" ActionBar... should port
  // light blue such as "tertiary", "third" or something later
  const currentRightsCollectionBars = rightsObjektArray.map((ProductRight, index) => (
    <div key={index}>
      <InnerCollectionBar
        title={ProductRight.right}
        subtitle={ProductRight.serviceProvider}
        color='warning'
      >
        <div>
          <p>Eventuell tekst om rettighetene kommer her.</p>
          <div className={classes.rightActionTagsWrapper}>{onlyTags}</div>
        </div>
      </InnerCollectionBar>
    </div>
  ));

  // OUTERMOST LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  const SysterUserCollectionBarArray = () => {
    return reduxObjektArray.map((SystemUser, index) => (
      <div key={index}>
        <OuterCollectionBar
          title={SystemUser.integrationTitle}
          subtitle={`${SystemUser.productName}`}
          additionalText={t('authent_overviewpage.rights_added')}
          color={'neutral'}
          compact={isSm}
        >
          <>
            <Heading level={3} size='xxsmall' spacing>
              Systembrukeren har disse rettighetene:
            </Heading>
            {currentRightsCollectionBars}
          </>
        </OuterCollectionBar>
      </div>
    ));
  };

  // Eldre greier: bør byttes ut, men kan trenges for Mobil-optimering
  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger

  const overviewText = t('authent_overviewpage.sub_title'); // Fix-me: mulig skal settes direkte
  // Fix-me: h2 below, not in Small/mobile view

  const goToStartNewSystemUser = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Creation);
  };

  return (
    <div>
      <Heading level={2} size='small' spacing>
        {overviewText}
      </Heading>
      <div className={classes.systemUserNewButton}>
        <Button variant='secondary' onClick={goToStartNewSystemUser} fullWidth={isSm}>
          <Add />
          {t('authent_overviewpage.new_system_user_button')}
        </Button>
      </div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.existing_system_users_title')}
      </Heading>
      {SysterUserCollectionBarArray()}
    </div>
  );
};
