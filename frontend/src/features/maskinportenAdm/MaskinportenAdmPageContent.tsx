import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { lagreNavn, lagreBeskrivelse } from '@/rtk/features/maskinportenPage/maskinportenPageSlice';
import { Heading, Textfield } from '@digdir/design-system-react';
import classes from './MaskinportenAdmPageContent.module.css';
import { UploadComponent } from './UploadComponent';

export const MaskinportenAdmPageContent = () => {
  const { t } = useTranslation('common');

  // Redux variabler
  const dispatch = useAppDispatch();
  const reduxNavn = useAppSelector((state) => state.maskinportenPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.maskinportenPage.beskrivelse);
  const reduxOnJwkFileAvailable = useAppSelector(
    (state) => state.maskinportenPage.onJwkFileAvailable,
  );

  // regulate upLoad button inside <UploadComponent />
  const isOpprettKnappBlokkert = !reduxNavn || !reduxBeskrivelse || !reduxOnJwkFileAvailable;

  // State variabler brukt for dynamisk oppdatering av Navn og Beskrivelse felt
  const [navn, setNavn] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');

  // brukes i h2, ikke vist i Small/mobile view

  // overviewText = t('authentication_dummy.auth_overview_text_creation');
  const overviewText = 'Opprett og administrer maskinporten integrasjon'; // flytt til språkstøtte

  const handleOnBlurNavn = () => {
    dispatch(lagreNavn({ navn: navn }));
  };

  const handleOnBlurBeskrivelse = () => {
    dispatch(lagreBeskrivelse({ beskrivelse: beskrivelse }));
  };

  return (
    <div>
      <div className={classes.flexContainer}>
        <Heading level={2} size='small'>
          {overviewText}
        </Heading>
        <Textfield
          label='Navn'
          type='text'
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          onBlur={handleOnBlurNavn}
        />
        <Textfield
          label='Beskrivelse'
          type='text'
          value={beskrivelse}
          onChange={(e) => setBeskrivelse(e.target.value)}
          onBlur={handleOnBlurBeskrivelse}
        />
        <UploadComponent opprettKnappBlokkert={isOpprettKnappBlokkert} />
      </div>
    </div>
  );
};
