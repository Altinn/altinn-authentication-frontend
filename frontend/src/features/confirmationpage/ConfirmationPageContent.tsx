import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';
import { useAppSelector } from '@/rtk/app/hooks';
import { Button, Heading } from '@digdir/design-system-react';
import classes from './ConfirmationPageContent.module.css';

export const ConfirmationPageContent = () => {
  // const [vendorsArrayPopulated, setVendorsArrayPopulated] = useState(false); // not used yet

  const { t } = useTranslation('common');

  const navigate = useNavigate();

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  const postConfirmed = useAppSelector((state) => state.creationPage.postConfirmed);

  return (
    <div>
      <Heading level={2} size='small'>
        {t('authent_confirmationpage.sub_title')}
      </Heading>
      <p>{t('authent_confirmationpage.content_text')}</p>
      {!postConfirmed && <p>Ikke helt bekreftet ennå: må håndteres</p>}
      <div className={classes.buttonContainer}>
        <Button variant='primary' size='small' onClick={handleReject}>
          {t('authent_confirmationpage.add_rights_button')}
        </Button>
        <Button variant='secondary' size='small' onClick={handleReject}>
          {t('authent_confirmationpage.add_no_rights_button')}
        </Button>
      </div>
    </div>
  );
};
