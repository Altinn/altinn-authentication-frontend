import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './ConfirmationPageContent.module.css';

export const ConfirmationPageContent = () => {
  // const [vendorsArrayPopulated, setVendorsArrayPopulated] = useState(false); // not used yet

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <Heading level={2} size='small'>
        {t('authent_confirmationpage.sub_title')}
      </Heading>
      <p>{t('authent_confirmationpage.content_text')}</p>
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
