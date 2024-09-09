import React from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { useTranslation } from 'react-i18next';
import classes from './RightsError.module.css';

export const RightsError = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Paragraph className={classes.noRightsParagraph}>
      <span className={classes.noRightsParagraphBold}>
        {t('authent_overviewpage.no_key_role1')}{' '}
      </span>
      {t('authent_overviewpage.no_key_role2')}
    </Paragraph>
  );
};
