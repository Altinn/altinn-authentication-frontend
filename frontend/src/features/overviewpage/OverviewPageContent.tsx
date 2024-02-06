import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationRoute } from '@/routes/paths';
import cn from 'classnames';
import classes from './OverviewPageContent.module.css';
import { ActionBar } from '@/components';
import { MinusCircleIcon, PlusIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { Button, Heading, Tag, Link } from '@digdir/design-system-react';
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
  }, [dispatch, postConfirmed]);

  const { t } = useTranslation('common'); // not used yet
  const navigate = useNavigate();

  const rightsObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );

  // Eldre greier: bør byttes ut, men kan trenges for Mobil-optimering
  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger

  const overviewText = t('authent_overviewpage.sub_title'); // Fix-me: mulig skal settes direkte
  // Fix-me: h2 below, not in Small/mobile view

  const goToStartNewSystemUser = () => {
    navigate(AuthenticationRoute.Creation);
  };

  return (
    <div>
      <Heading level={2} size='small' spacing>
        {overviewText}
      </Heading>
      <div className={classes.systemUserNewButton}>
        <Button variant='secondary' onClick={goToStartNewSystemUser} fullWidth={isSm}>
          <PlusIcon />
          {t('authent_overviewpage.new_system_user_button')}
        </Button>
      </div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.existing_system_users_title')}
      </Heading>
      {reduxObjektArray.map((systemUser) => (
        <ActionBar
          key={systemUser.id}
          title={systemUser.integrationTitle}
          subtitle={`${systemUser.productName}`}
          color='light'
          size='large'
        >
          <div className={cn(classes.accordionContent, { [classes.compact]: isSm })}>
            <div className={classes.rightsHeader}>
              <Heading level={3} size='xxsmall' spacing>
                Systembrukeren har disse rettighetene:
              </Heading>
              <Link as={RouterLink} to={`${AuthenticationRoute.Details}/${systemUser.id}`}>
                <PencilWritingIcon height={'1.25rem'} width={'1.25rem'} />
                Rediger systembruker
              </Link>
            </div>
            {rightsObjektArray.map((right) => {
              return (
                <ActionBar
                  key={right.right}
                  title={right.right}
                  subtitle={right.serviceProvider}
                  color='neutral'
                />
              );
            })}
          </div>
        </ActionBar>
      ))}
    </div>
  );
};
