import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './RightsIncludedPageContent.module.css';
import { ActionBar } from '@/components';
import { useCreateSystemUserMutation, useGetRightsQuery } from '@/rtk/features/systemUserApi';

export const RightsIncludedPageContent = () => {
  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere (men den kjører foreløpig fortsatt POST)

  const location = useLocation();
  const { t } = useTranslation('common');
  const [postNewSystemUser] = useCreateSystemUserMutation();
  const { data: rights } = useGetRightsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.integrationName || !location.state?.selectedSystemType) {
      navigate(AuthenticationRoute.Creation);
    }
  }, [location.state?.integrationName, location.state?.selectedSystemType]);

  const handleConfirm = () => {
    // POST 3 useState variables, while the last two not yet implemented
    // Update 08.01.24: agreement with Simen-backend that only two
    // key:value pairs are needed
    const postObjekt = {
      integrationTitle: location.state.integrationName,
      selectedSystemType: location.state.selectedSystemType,
    };

    postNewSystemUser(postObjekt)
      .unwrap()
      .then(() => navigate(AuthenticationRoute.Overview));
  };

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <Heading level={2} size='small'>
        {t('authent_includedrightspage.sub_title', {
          name: location.state?.integrationName,
        })}
      </Heading>
      <p className={classes.contentText}>{t('authent_includedrightspage.content_text')}</p>
      <div>
        {rights?.map((productRight) => (
          <ActionBar
            key={productRight.right}
            title={productRight.right}
            subtitle={`${productRight.serviceProvider}`}
            color={'neutral'}
          />
        ))}
        <div className={classes.buttonContainer}>
          <Button size='small' onClick={handleConfirm}>
            {t('authent_includedrightspage.confirm_button')}
          </Button>
          <Button variant='tertiary' size='small' onClick={handleReject}>
            {t('authent_includedrightspage.cancel_button')}
          </Button>
        </div>
      </div>
    </div>
  );
};
