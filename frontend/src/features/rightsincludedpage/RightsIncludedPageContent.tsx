import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest } from '@/rtk/features/creationPage/creationPageSlice';
import classes from './RightsIncludedPageContent.module.css';
import { ActionBar } from '@/components';

export const RightsIncludedPageContent = () => {
  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere (men den kjører foreløpig fortsatt POST)

  // denne skal hente array av RightsDTO fra Redux
  // (henter nå bare systemUserArray a la OverviewPage)
  // men vi har ennå ikke en redux slice for RightsIncludedPage
  // eller et GET kall til backend for å hente RightsDTO
  // men Simen har laget dette endepunktet: se Swagger per 10.01.24
  const reduxObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );
  const location = useLocation();
  const { t } = useTranslation('common');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    // POST 3 useState variables, while the last two not yet implemented
    // Update 08.01.24: agreement with Simen-backend that only two
    // key:value pairs are needed
    const postObjekt: CreationRequest = {
      integrationTitle: location.state.integrationName,
      selectedSystemType: location.state.selectedSystemType,
    };

    void dispatch(postNewSystemUser(postObjekt)).then(() => {
      navigate(AuthenticationRoute.Overview);
    });
  };

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <Heading level={2} size='small'>
        {t('authent_includedrightspage.sub_title')}
      </Heading>
      <p className={classes.contentText}>{t('authent_includedrightspage.content_text')}</p>
      <div>
        {reduxObjektArray.map((ProductRight) => (
          <ActionBar
            key={ProductRight.right}
            title={ProductRight.right}
            subtitle={`${ProductRight.serviceProvider}`}
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
